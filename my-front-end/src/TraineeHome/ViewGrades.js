import react from "react";
import "./ViewGrades.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useState, useEffect } from "react";
import Header from "./Header/Header";
const ViewGrades = () => {
  const currentUser = useSelector((state) => state.current.user);
  const [grades, setGrades] = useState([]);
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
if(currentUser.Type !== "IndividualTrainee")
  {
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
                  <td>{grade.Code}</td>
                  <td>{grade.Grade}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewGrades;
