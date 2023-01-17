import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";

function SeePrevReported() {
    const [courses, setCourses] = useState([]);
    const [followupSent, setFollowupSent] = useState({});
    useEffect(() => {
        axios.post('http://localhost:5000/viewReportedCourses', { UserName: 'youssefahmed' })
            .then(res => {
                console.log(res);
                setCourses(res.data);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);
    console.log(courses)
    const handleFollowup = (c) => {
        const followup = document.getElementById(`followup-note-${c.CourseID}`).value;
        axios.post('http://localhost:5000/FollowupNote', {
            UserName: c.UserName,
            CourseID: c.CourseID,
            Followup: followup
        })
            .then(res => {
                console.log(res);
                setFollowupSent({ ...followupSent, [c.CourseID]: true });
            })
            .catch(err => {
                console.log(err);
            });
    }
    
    if (courses && courses.reportedCourses) {
        return (
            <div>
                <h1>Previously Reported Courses</h1>
                {courses.reportedCourses.map((c) => (
                    <div>
                        
                        <span className>Course Reported:&nbsp;{c.CourseID}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className>Report Type:&nbsp;{c.Report_Type}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className>Report Description:&nbsp;{c.Report_Description}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className={styles.courseName}>Status:&nbsp;{c.Report_Status}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {!followupSent[c.CourseID] ? (
                            <>
                                <input type="text" id={`followup-note-${c.CourseID}`} placeholder="Add Followup Note" />
                                <button onClick={() => handleFollowup(c)}>Add Followup Note</button>
                            </>
                        ) : <span>Followup Sent</span>}
                    </div>
                ))}
            </div>
        );
    }
    

        
    
}

export default SeePrevReported;
