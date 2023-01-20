const express = require("express");
const { lte } = require("semver");
const router = express.Router();
const nodemailer = require("nodemailer");
const pdf = require("html-pdf");
const Exam = require("../Model/Exam");
const SolvedExam = require("../Model/SolvedExam");
const Instructor = require("../Model/Instructor");
const course = require('../model/course');
const IndividualTrainee = require("../Model/IndividualTrainee");
const RegisteredCourse = require("../Model/RegisteredCourse");
const { Administrator } = require("../Model/Administrator");
const { __await } = require("tslib");
const authenticateToken = require("./middleware/authenticatetoken");

router.post("/instructor/addExam", async (req, res) => {
  try {
    const ExerciseIDArray = req.body.Question;
    const AnswerArray = [];
    ExerciseIDArray.forEach((element) => {
      AnswerArray.push({
        ExerciseID: element.ExerciseID,
        ExerciseAnswer: null,
      });
    });
    const addExam = await Exam.create({
      Code: req.body.Code,
      Question: req.body.Question,
      Choices: req.body.Choices,
      Answer: req.body.Answer,
      UserName: req.body.UserName,
    });
    res.status(200).send(addExam);
  } catch (err) {
    if (err.code === 11000) {
      res.status(400).send("Exam code already exists");
    } else {
      res.status(400).send(err);
    }
  }
});

router.post("/addAnswerToExam/:ExamCode", async (req, res) => {
  const givenAnswerArray = req.body.Answer;
  var ExamArray = [];
  const wrongGivenExercises = [];
  const exactGivenExercises = [];
  await Exam.findOne({ Code: req.params.ExamCode })
    .then((data) => {
      if (data === null) res.status(400).send("Exam not found");
      else {
        ExamArray = ExamArray.concat(data.Answer);
        // res.send(ExamArray);
      }
    })
    .catch((err) => {
      res.send(err);
    });
  // res.send(ExamArray);
  //   const ExamArray = ExamFound.Answer;
  //   console.log(givenAnswerArray);
  givenAnswerArray.forEach((element) => {
    const Obj = {
      ExerciseID: element.ExerciseID,
      ExerciseAnswer: null,
    };
    if (ExamArray.some((e) => e.ExerciseID === element.ExerciseID)) {
      exactGivenExercises.push({
        ExerciseID: element.ExerciseID,
        ExerciseAnswer: element.ExerciseAnswer,
      });
    } else {
      wrongGivenExercises.push(element.ExerciseID);
    }
  });
  await Exam.findOneAndUpdate(
    { Code: req.params.ExamCode },
    { Answer: exactGivenExercises }
  ).then((data) => {
    res.send(data);
  });
});

router.post("/individualtrainee/viewaExam", async (req, res) => {
  const found = await SolvedExam.findOne({
    Code: req.body.Code,
    TraineeUsername: req.body.TraineeUsername,
  }).then((data) => {
    return data;
  });
  if (found) {
    res.status(400).send("Exam already solved");
  } else {
    Exam.find({ Code: req.body.Code })
      .select("Code Question -_id")
      .exec((err, course) => {
        if (course.length === 0) res.status(404).send("Exam not found");
        else res.status(200).send(course[0]);
      });
  }
});

router.post("/individualtrainee/viewcorrectanswers", async (req, res) => {
  const found = await Exam.findOne({ Code: req.body.Code }).then((data) => {
    return data;
  });
  // res.send(found);
  var correctAnswers = [];
  for (let i = 0; i < found.Answer.length; i++) {
    switch (found.Answer[i].ExerciseAnswer) {
      case "A":
        correctAnswers.push({
          Question: found.Question[i].Question,
          Answer: found.Question[i].Choices[0],
        });
        break;
      case "B":
        correctAnswers.push({
          Question: found.Question[i].Question,
          Answer: found.Question[i].Choices[1],
        });
        break;
      case "C":
        correctAnswers.push({
          Question: found.Question[i].Question,
          Answer: found.Question[i].Choices[2],
        });
        break;
      case "D":
        correctAnswers.push({
          Question: found.Question[i].Question,
          Answer: found.Question[i].Choices[3],
        });
        break;
      default:
        break;
    }
  }
  res.status(200).send(correctAnswers);
});

router.post("/individualtrainee/solveExam", async (req, res) => {
  const foundExam = await Exam.findOne({ Code: req.body.Code }).then((data) => {
    return data;
  });
  const answer = req.body.Answer;
  const correctAnswer = foundExam.Answer;
  var correct = 0;
  for (let i = 0; i < answer.length; i++) {
    for (let j = 0; j < correctAnswer.length; j++) {
      if (answer[i].ExerciseID === correctAnswer[j].ExerciseID) {
        if (answer[i].ExerciseAnswer === correctAnswer[j].ExerciseAnswer) {
          correct++;
        }
      }
    }
  }
  const grade = correct + " / " + answer.length;
  const SolvedExamNew = await SolvedExam.create({
    Code: req.body.Code,
    Answer: req.body.Answer,
    TraineeUsername: req.body.TraineeUsername,
    Grade: grade,
  })
    .catch((err) => {
      res.status(400).send(err);
    })
    .then((data) => {
      res.status(200).send(data);
    });
});

router.post("/individualtrainee/viewmygrades", async (req, res) => {
  await SolvedExam.find({ TraineeUsername: req.body.TraineeUsername })
    .select("Code Grade -_id")
    .exec((err, course) => {
      if (course.length === 0) res.status(404).send("Exam not found");
      else res.status(200).send(course);
    });
});

router.post("/Instructor/addexamtocourse", async (req, res) => {
    await course.findOneAndUpdate(
      {title : req.body.title},
      {$set : {Exams : req.body.Exams}}
    ).then((data) => {
      res.status(200).send(data);
    });
});

router.post("/individualtrainee/registercourse", async (req, res) => {
    await RegisteredCourse.create({
      TraineeUsername: req.body.TraineeUsername,
      title: req.body.title,
    }).then((data) => {
      res.status(200).send(data);
    }
    ).catch((err) => {
      res.status(400).send("Aleady registered");
    });
});


router.post("/individualtrainee/viewprogress",async (req, res) => {
  const registercourses = await RegisteredCourse.find({
    TraineeUsername: req.body.TraineeUsername,
  }).then((data) => {
    return data;
  });
  var titlesofcourses = [];
  for(let i = 0 ; i < registercourses.length ; i++)
  {
    titlesofcourses.push(registercourses[i].title);
  }

  const courses = await course.find({ title: { $in: titlesofcourses } });
  var coursecompleted = [];
  if (courses.length === 0)
    res.status(404).send("Trainee not registered in any course");
  else {
    for (let i = 0; i < courses.length; i++) {

      const solvedexams = await SolvedExam.find({
        Code: { $regex: `^${courses[i].title}.*` },
        TraineeUsername: req.body.TraineeUsername,
      }).then((data) => {
        return data;
      });
      if(courses[i].Exams.length !== 0)
      {
      coursecompleted.push({
        title: courses[i].title,
        percentage: ((solvedexams.length / courses[i].Exams.length) * 100).toFixed(2),
      });
      } 
    }
    res.status(200).send(coursecompleted);
  }
});

// Individual Trainee Recieve Certificate

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

router.post("/individualtrainee/recievecerftifcate", async (req, res) => {
  const { UserName, Type } = req.body;
  var Email;
  switch (Type) {
    case "IndividualTrainee":
      await IndividualTrainee.findOne({ UserName: UserName }).then((data) => {
        Email = data.Email;
      });
      break;
    case "Instructor":
      await Instructor.findOne({ UserName: UserName }).then((data) => {
        Email = data.Email;
      });
      break;
    case "Admin":
      await Administrator.findOne({ UserName: UserName }).then((data) => {
        Email = data.Email;
      });
      break;
  }
  const html = `<p>Congratulations ${UserName}! You have successfully completed the course.</p>`;

  pdf.create(html).toBuffer(async (err, buffer) => {
    if (err) {
      res.status(500).send(err);
    } else {
      const mailOptions = {
        from: "pedrilearning@gmail.com",
        to: Email,
        subject: "Course Completion Certificate",
        text: "Congratulations on completing the course!",
        attachments: [
          {
            filename: "certificate.pdf",
            content: buffer,
          },
        ],
      };
      await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          res.status(500).send(error);
        } else {
          res.status(200).send("Certificate sent successfully!");
        }
      });
    }
  });
});

router.get("/instructor/viewExams", async (req, res) => {
  const InstructorUserName = req.body.UserName;
  const Exams = await Exam.find({ UserName: InstructorUserName });
  res.send(Exams);
});

/* Exam.findOne({Code : req.params.ExamCode}).then((data)=>{
  //     if(data === null)
  //         res.status(400).send("Exam not found");
  //     else
  //         {
  //             const ExamFound = data;
  //             res.send(ExamFound);
  //         }
  // })
  // const answerNew = req.body.Answer;
  // for(let i = 0; i < answerNew.length; i++)
  //     {
  //         if()
  */
module.exports = router;
