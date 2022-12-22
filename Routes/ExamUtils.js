const express = require("express");
const { lte } = require("semver");
const router = express.Router();

const Exam = require("../Model/Exam");
const SolvedExam = require("../Model/SolvedExam");
const Instructor = require("../Model/Instructor");

router.post("/addExam/:instructorID", async (req, res) => {
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
    Answer: AnswerArray,
    InstructorID: req.params.instructorID,
  })
    .catch((err) => {
      res.status(400).send(err);
    })
    .then((data) => {
      res.status(200).send(data);
    });
});

router.post("/addAnswerToExam/:ExamCode", async(req, res) => {
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
    if (ExamArray.some(
        e => e.ExerciseID === element.ExerciseID 
    )) {
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
             { Answer: exactGivenExercises })
             .then((data) => {
                    res.send(data);
                })
  //   const ExerciseIDArray = ExamFound.Question;
  //   const AnswerArray = ExamFound.Answer;
  //   if(ExerciseIDArray.length !== AnswerArray.length)
  //   {
  //         res.status(400).send("Please answer all the questions");
  //   }
  //  else
  //     {
  //         const wrongExercises = [];
  //         for(let i = 0; i < ExerciseIDArray.length; i++)
  //         {
  //             AnswerArray.array.forEach(element => {
  //                 if(element.ExerciseID !== ExerciseIDArray[i].ExerciseID)
  //                   {
  //                         wrongExercises.push(element.ExerciseID);
  //                   }
  //             });
  //         }
  //         if(wrongExercises.length !== 0)
  //         {
  //             res.status(400).send("these exercises are not in the exam", wrongExercises);
  //         }
  //         else
  //         {
  //             res.status(200).send("Aswers Added");
  //         }
  //     }
});

router.get('/viewallExams', (req,res) => {
    Exam.find({}).select().exec((err, course) => {
        if(err) {
            res.status(500).send(err);
        } else {
  
            res.status(200).send(course);
        }
    });  
  });

router.post("/solveexam/:traineeid", async (req, res) => {
    const ExamCode = req.body.ExamCode;
    const AnswerArray = req.body.Answer;
    const SolvedExamNew = await SolvedExam.create({
        Code: ExamCode,
        Answer: AnswerArray,
        TraineeID: req.params.traineeid,
    })
        .catch((err) => {
        res.status(400).send(err);
        })
        .then((data) => {
        res.status(200).send(data);
        });
})

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
