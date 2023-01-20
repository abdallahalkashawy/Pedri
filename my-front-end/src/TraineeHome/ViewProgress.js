import React, { useEffect } from "react";
import Header from "./Header/Header";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const ViewProgress = () => {
    const [progress , setProgress] = useState([]);
    const currentaccess = useSelector((state) => state.auth.refreshToken);
    const currentUser = useSelector((state) => state.current.user);
    if (currentUser.Type !== "IndividualTrainee") {
        window.location.href = "/";
    }

  useEffect(() => {
    axios
      .post("http://localhost:3000/individualtrainee/viewprogress", {
        TraineeUsername : currentUser.UserName,
      }, 
        { "content-type": "application/json" ,
       })
      .then((res) => {
        setProgress(res.data);
      })
      .catch((err) => {
       
      });
  }, []);

  return (
    <div>
      <Header />
      <table>
        <thead>
          <tr>
            <th>Course</th>
            <th>Completed</th>
          </tr>
        </thead>
        <tbody>
          {progress.map((grade, index) => {
            return (
              <tr key={index}>
                <td>{grade.title}</td>
                <td>{grade.percentage}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ViewProgress;
