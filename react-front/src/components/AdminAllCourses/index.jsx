import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

function AdminAllCourses() {
    const [courses, setCourses] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [selectedSubject, setSelectedSubject] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/fetchallCourses')
            .then(res => {
                console.log(res)
                setCourses(res.data);
                setSubjects([...new Set(res.data.courses.map((c) => c.subject))]);
            })
            .catch(err => {
                console.log(err)
            })
    }, [courses]);

    const handleDiscount = (course) => {
        const title = course.title;
        const Discount = prompt("Enter the discount");
        if (!Discount || Discount < 0 || Discount > 100) {
            return alert("Invalid Discount Value, it should be between 0 and 100")
        }
        axios.post("http://localhost:5000/setDiscountToAcourse", { title, Discount })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleDiscountAll = () => {
        const Discount = prompt("Enter the discount for all courses");
        if (!Discount || Discount < 0 || Discount > 100) {
            return alert("Invalid Discount Value, it should be between 0 and 100")
        }
        axios.post("http://localhost:5000/setDiscountToAll", { Discount })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleDiscountBySubject = (subject, Discount) => {
        axios.post("http://localhost:5000/setDiscountToSeveralCourses", { subject, Discount })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    const handleDiscountBySubjectClick = () => {
        const Discount = prompt("Enter the discount for the selected subject");
        if (!Discount || Discount < 0 || Discount > 100) {
            return alert("Invalid Discount Value, it should be between 0 and 100")
        }
        handleDiscountBySubject(selectedSubject, Discount);
    }

    const onSubjectChange = (e) => {
        setSelectedSubject(e.target.value);
    }

    if (courses && courses.courses) {
        const x = courses.courses.map((c) => {
            return (
                <div>
                    <span className={styles.courseName}>Course Name:&nbsp;{c.title}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className={styles.courseName}>Price:{c.price}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className={styles.courseName}>Subject:&nbsp;{c.subject}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className={styles.courseName}>Discount:&nbsp;{c.Discount}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <button onClick={() => handleDiscount(c)}>Set Discount</button>
                </div>
            );
        });
        return (
            <div>
                <h1>Courses Available</h1>
                <button className="DiscountToAll" onClick={handleDiscountAll}>Discount to All</button>
                
                
                <div className="right-position">
    <button className="ApplyDiscount" onClick={handleDiscountBySubjectClick}>Apply Discount</button>
    <select onChange={onSubjectChange}>
        <option value="" disabled selected>Discount by Subject</option>
        {subjects.map((subject) => {
            return <option value={subject}>{subject}</option>
        })}
    </select>
</div>

                                {x}
                            </div>
                        )
                    }
                }
                
                export default AdminAllCourses;
