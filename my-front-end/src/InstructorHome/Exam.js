import "./Exam.css";
import Swal from "sweetalert2";
import React, { useState, useEffect } from "react";
import Question from "../Question/Question";
import Popup from "reactjs-popup";
import { useSelector } from "react-redux";
import axios from "axios";
import swal from "sweetalert";
import Header from "./Header/Header";
const { v4: uuidv4 } = require("uuid");
const Exam = () => {

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [ExerciseCode, setExerciseCode] = useState("");
  const [subjectCodeError, setSubjectCodeError] = useState(false);

  const currentUser = useSelector((state) => state.current.user);

  if(currentUser.Type !== "Instructor")
  {
    window.location.href = "/";
  }

  useEffect(() => {
  }, [questions]);

  const takeExercise = (exercise, answer) => {
    const qindex = questions.findIndex(
      (q) => q.ExerciseID === exercise.ExerciseID
    );
    const updatedQuestions = [...questions];
    updatedQuestions[qindex] = exercise;
    setQuestions(updatedQuestions);
    const aindex = answers.findIndex(
      (a) => a.ExerciseID === exercise.ExerciseID
    );
    if (aindex === -1) {
      setAnswers((answers) => {
        return [
          ...answers,
          {
            ExerciseID: exercise.ExerciseID,
            ExerciseAnswer: answer,
          },
        ];
      });
    } else {
      const updatedAnswers = [...answers];
      updatedAnswers[aindex] = {
        ExerciseID: exercise.ExerciseID,
        ExerciseAnswer: answer,
      };
      setAnswers(updatedAnswers);
    }
  };

  const addAnotherHandle = () => {
   
      {
        ExerciseCode &&
          setQuestions((questions) => {
            return [
              ...questions,
              {
                ExerciseID:
                  ExerciseCode.toUpperCase() +
                  "-" +
                  "E-" +
                  uuidv4().slice(0, 4).toUpperCase(),
                Question: "",
                Choices: ["", "", "", ""],
              },
            ];
          });
      }
  };

  const removeQuestion = (id) => {
    setQuestions((questions) => {
      return questions.filter((question) => question.ExerciseID !== id);
    });
  };

  const scode = (e) => {
    if (questions.length === 0) {
      setExerciseCode(e.target.value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = "";
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].Question === "")
        errors += `Question ${i + 1} is empty \n`;
      var allright = true;
      for (let j = 0; j < questions[i].Choices.length; j++) {
        if (questions[i].Choices[j] === null) {
          allright = false;
          break;
        }
      }
      if (!allright) {
        errors += `Question ${i + 1} has empty choices \n`;
      }
    }
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].ExerciseAnswer === "")
        errors += `Exercise ${i + 1} has no answer \n`;
    }
    
    if (errors === "" && questions.length > 0 && answers.length > 0) {
      axios
        .post("http://localhost:3000/instructor/addExam", Exam, {
          "Content-Type": "application/json",
        })
        .then((res) => {
          swal("Exam Added Successfully");
         
        })
        .catch((err) => {
          Swal.fire({
            icon: "warning",
            text: err.response.data,
          });
         
        });
    } else {
     
      if (questions.length === 0) {
        Swal.fire({
          icon: "warning",
          text: "No Questions Added",
        });
      } else {
        Swal.fire({
          icon: "warning",
          text: errors,
        });
      }
    }
  };

  const Exam = {
    Code: ExerciseCode,
    Question: questions,
    UserName: currentUser.UserName,
    Answer: answers,
  };

  return (
    <div className="Exam">
      <Header />
      <h1>Enter Exam</h1>
      {subjectCodeError && (
        <Popup trigger={<button>show message </button>} position="right center">
          <div>Popup content here !!</div>
        </Popup>
      )}
      <input
        className="examName"
        type="text"
        placeholder="Subject Code"
        onChange={scode}
      />
      <ol>
        {questions.map((question, i) => (
          <Question
            key={question.ExerciseID}
            id={question.ExerciseID}
            questionIndex={question.ExerciseID}
            removeQuestion={removeQuestion}
            takeExercise={takeExercise}
          ></Question>
        ))}
      </ol>
      <input
        className="submit"
        type="submit"
        value="Submit"
        onClick={handleSubmit}
      />
      <button className="submit" type="button" onClick={addAnotherHandle}>
        add another question
      </button>
    </div>
  );
};
export default Exam;
