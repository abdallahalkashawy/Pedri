import react from "react";
import "./ViewGrades.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./Header/Header";
const ViewGrades = () => {
  const [yestoshow, setYestoshow] = useState(false);
  const currentUser = useSelector((state) => state.current.user);
  const [grades, setGrades] = useState([]);
  const [correctanswers, setCorrectanswers] = useState([]);
  const showanswers = (code) => {
    axios.post(
      "http://localhost:3000/individualtrainee/viewcorrectanswers",
      { Code: code },
      { "content-type": "application/json" }
    ).then((res) => {
      setCorrectanswers(res.data);
      setYestoshow(true);
    });
  };

  useEffect(() => {
    axios
      .post(
        "http://localhost:3000/individualtrainee/viewmygrades",
        {
          TraineeUsername: currentUser.UserName,
        },
        { "content-type": "application/json" }
      )
      .then((res) => {
        setGrades(res.data);
      });
  }, []);
  if (currentUser.Type !== "IndividualTrainee") {
    window.location.href = "/";
  }

  return (
    <div>
      <Header />
      <table>
        <thead>
          <tr>
            <th>Exam Code</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((grade, index) => {
            return (
              <tr key={index}>
                <td>
                  {grade.Code}
                  <button
                    className="ViewCorrect"
                    onClick={() => showanswers(grade.Code)}
                  >
                    {" "}
                    View correct answer
                  </button>
                </td>
                <td className="Grade">{grade.Grade}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {yestoshow && (
        <div className="allquest">
          {correctanswers.map((correctanswer, index) => {
            return (
              <div key={index}>
                <p className="quest">Question: {correctanswer.Question}</p>
                <p className="ans">Correct Answer: {correctanswer.Answer}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewGrades;
