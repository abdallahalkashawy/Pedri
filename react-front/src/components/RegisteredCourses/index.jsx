import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";
import { useHistory } from "react-router-dom";

function RegisteredCourses() {
    const [courses,setCourses] = useState([]);
    const history = useHistory();
    useEffect(() => {
        axios.post('http://localhost:5000/viewRegisteredCourses', {UserName:'youssefahmed'})
         .then(res => {
        console.log(res)
         setCourses(res.data.Registered_Courses)
         })
         .catch(err => {
          console.log(err)
         })
    },[]);
    const x = courses.map((c) => {
        return (
          <div>
            <span className={styles.courseName}>{c}</span>
            <button className="report-button" onClick={() => {
                localStorage.setItem("CourseID", c);
                history.push("/reportcourse")
            }}>report</button>
          </div>
        );
      });
    return(
        
        <div>
            <h1>Registered Courses</h1>
             {x}  
            
        </div>
    )
}

export default RegisteredCourses;
