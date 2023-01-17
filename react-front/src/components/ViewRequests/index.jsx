import { useEffect, useState} from "react";
import axios from "axios";
import styles from "./styles.module.css";

function ViewRequests() {
    const [courses,setCourses] = useState([])
    const [granted,setGranted] = useState([])
    const [rejected,setRejected] = useState([])
    useEffect(() => {
        axios.get('http://localhost:5000/ViewCourseRequests')
         .then(res => {
        console.log(res)
         setCourses(res.data)
         })
         .catch(err => {
          console.log(err)
         })
    },[])
    const handleClick = (c) => {
        axios.post('http://localhost:5000/registerAcourse', { title: c.Course, UserName: 'youssefahmed' })
         .then(res => {
            setGranted([...granted,c.Course])
         })
         .catch(err => {
          console.log(err)
         })
    }
    const handleRejectClick = (c) => {
        axios.post('http://localhost:5000/rejectRequestedCourse', { title: c.Course, UserName: 'youssefahmed' })
         .then(res => {
            setRejected([...rejected,c.Course])
         })
         .catch(err => {
          console.log(err)
         })
    }
    const x = courses.map((c) => {
        if(granted.includes(c.Course)){
            return (
                <div>
                  <span className={styles.courseName}>Course Requested:&nbsp;{c.Course}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Granted

                </div>
              );
            } 
            if(rejected.includes(c.Course)){
                return (
                    <div>
                      <span className={styles.courseName}>Course Requested:&nbsp;{c.Course}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>Rejected
                    </div>
                  );
                } 
        return (
          <div>
            <span className={styles.courseName}>Course Requested:&nbsp;{c.Course}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Username of Requestor:&nbsp;{c.NameOfRequestor}</span>
            <button className="report-button" onClick={() => handleClick(c)}>Grant Access</button> 
            <button className="report-button" onClick={() => handleRejectClick(c)}>Reject</button>
          </div>
        );

      });
    return(
        
        <div>
            <h1>Courses Requests</h1>
             {x}  
            
        </div>
    )
}

export default ViewRequests;
