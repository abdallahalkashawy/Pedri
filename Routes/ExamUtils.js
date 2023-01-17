const express = require("express");
const { lte } = require("semver");
const router = express.Router();

const Exam = require("../Model/Exam");
const SolvedExam = require("../Model/SolvedExam");
const Instructor = require("../Model/Instructor");

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

router.post("/individualtrainee/viewaExam", async(req, res) => {
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
  .select('Code Grade -_id').exec((err, course) => {
    if (course.length === 0) res.status(404).send("Exam not found");
    else res.status(200).send(course);
  }
  );
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
