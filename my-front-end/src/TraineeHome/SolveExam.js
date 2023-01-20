import React, { useContext, useEffect, useState } from "react";
import "./SolveExam.css";
import "../Question/Choice.js";
import Choice from "../Question/Choice.js";
import axios from "axios";
import Swal from "sweetalert2";
import { useSelector } from "react-redux";
import swal from "sweetalert";
import Header from "./Header/Header";
const SolveExam = () => {
  const currentUser = useSelector((state) => state.current.user);

  const [disabled, setDisabled] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [examCode, setExamCode] = useState("");
  const [answer, setAnswer] = useState([]);
  const [examName, setExamName] = useState({
    Code: "",
    Question: [],
  });

  const [viewQuestion, setViewQuestion] = useState(false);

  const submitExamAnswers = () => {
    axios.post("http://localhost:3000/individualtrainee/solveExam",
      {
        Code: examCode,
        Answer: answer,
        TraineeUsername: currentUser.UserName,
      },
    { "Content-Type": "application/json" }
    )
      .then((res) => {
        swal("Exam Submitted Successfully")
        window.location.href = "/TraineeHome";
      }).catch((err) => {
        swal("Exam Not Submitted")
      });
    setSubmitted(true);
  };

  const selectAnswer = (exerciseAnswer) => {
   
    if (answer.length === 0) {
      setAnswer([exerciseAnswer]);
    } else {
      const aindex = answer.findIndex((a) => a.ExerciseID === exerciseAnswer.ExerciseID);
      if (aindex === -1) {
        setAnswer([...answer, exerciseAnswer]);
      } else {
        const updatedAnswers = [...answer];
        updatedAnswers[aindex] = exerciseAnswer;
        setAnswer(updatedAnswers);
      }
    }
    
  };



  const viewExam = () => {
    if (examCode !== "") {
      axios
        .post(
          "http://localhost:3000/individualtrainee/viewaExam",
          { Code: examCode, TraineeUsername: currentUser.UserName },
          { "Content-Type": "application/json" }
        )
        .then((res) => {
          setViewQuestion(true);
          setDisabled(true);
          console.log(res.data);
          setExamName(res.data);
        })
        .catch((err) => {
          
          Swal.fire({
            icon: "info",
            text: err.response.data,
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        text: "Please Enter Exam Code",
      });
    }
  };
  return (
    <div>
      <Header />
      {!submitted ? (
        <div className="SolveExam">
          <input
            className="examName"
            type="text"
            placeholder="Exam Code"
            onChange={(e) => setExamCode(e.target.value)}
          />
          <button disabled={disabled} onClick={viewExam}>
            Enter
          </button>
          {viewQuestion && (
            <div className="question-card">
              {examName.Question.map((item, j) => {
                return (
                  <div key={j}>
                    <h1 key={j} className="Question">{item.Question}</h1>
                    <Choice
                      exerciseID={item.ExerciseID}
                      choices={item.Choices}
                      selectAnswer={selectAnswer}
                    />
                  </div>
                );
              })}
              <button type="submit" onClick={submitExamAnswers}>
                Submit Answers
              </button>
            </div>
          )}
        </div>
      ) : (
        <div>Submitted</div>
      )}
    </div>
  );
};

export default SolveExam;
