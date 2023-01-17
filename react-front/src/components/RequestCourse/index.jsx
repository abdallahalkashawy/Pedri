import { useEffect, useState} from "react";
import axios from "axios";
import styles from "./styles.module.css";

function RequestCourse() {
    const [courses,setCourses] = useState([])
    const [requested,setRequested] = useState([])
    useEffect(() => {
        axios.post('http://localhost:5000/viewCourses', { id: '63b89a558d16b591be1c916f' })
         .then(res => {
        console.log(res)
         setCourses(res.data)
         })
         .catch(err => {
          console.log(err)
         })
    },[])
    const handleClick = (c) => {
        axios.post('http://localhost:5000/requestCourse', { Course: c.title, NameOfRequestor: 'youssefahmed' })
         .then(res => {
            setRequested([...requested,c.title])
         })
         .catch(err => {
          console.log(err)
         })
    }
    const x = courses.map((c) => {
        if(c.isRegistered){
            return (
                <div>
                  <span className={styles.courseName}>{c.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Registered
                  
                </div>
              ); 
        }
        if(requested.includes(c.title)){
            return (
                <div>
                  <span className={styles.courseName}>{c.title}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Requested
                  
                </div>
              ); 
        }
        return (
          <div>
            <span className={styles.courseName}>{c.title}</span>
            <button className="report-button" onClick={() => handleClick(c)}>request access</button>
          </div>
        );
      });
    return(
        
        <div>
            <h1>Available Courses</h1>
             {x}  
            
        </div>

    )
}

export default RequestCourse;
