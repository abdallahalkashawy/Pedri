import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";

function AdminViewReported() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/ViewCoursesReported')
            .then(res => {
                console.log(res);
                setCourses(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    console.log(courses)
    const x = courses.map((c) => {
        return (
            <div>
                <span className={styles.courseName}>Username:&nbsp;{c.UserName}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className={styles.courseName}>Course Reported:&nbsp;{c.CourseID}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className={styles.courseName}>Report Type:&nbsp;{c.Report_Type}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className={styles.courseName}>Report Reason:&nbsp;{c.Report_Description}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {c.Followup_Note !== "" && <span className={styles.courseName}>Followup Note:&nbsp;{c.Followup_Note}</span>}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className={styles.courseName}>Status:&nbsp;{c.Report_Status === "Processing" ? "Unseen" : c.Report_Status}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                
                <button onClick={() => {
                    axios.post('http://localhost:5000/StatusPending', {
                        UserName: c.UserName,
                        CourseID: c.CourseID
                    }).then(res => {
                        console.log(res);
                        setCourses(courses.map(course => {
                            if (course.UserName === c.UserName && course.CourseID === c.CourseID) {
                                course.Report_Status = "Pending";
                            }
                            return course;
                        }));
                    }).catch(err => {
                        console.log(err);
                    });
                }}>Pending</button>
                <button onClick={() => {
                    axios.post('http://localhost:5000/StatusResolved', {
                        UserName: c.UserName,
                        CourseID: c.CourseID
                    }).then(res => {
                        console.log(res);
                        setCourses(courses.map(course => {
                            if (course.UserName === c.UserName && course.CourseID === c.CourseID) {
                                course.Report_Status = "Resolved";
                            }
                            return course;
                        }));
                    }).catch(err => {
                        console.log(err);
                    });
                }}>Resolved</button>
            </div>
        );
    });
    
    return (
        <div>
            <h1>Previously Reported Courses</h1>
            {x}
        </div>
    );
    

        
        

        
    
}

export default AdminViewReported;
