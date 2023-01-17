import { useState, useEffect } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const ReportCourse = () => {
	const [CourseID, setCourse] = useState("");
    const [Report_Type, setReport] = useState("");
	const [Report_Description, setReportDescription] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");
	
  useEffect(() => {
      setCourse(localStorage.getItem("CourseID"));
  }, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:5000/courseReport`;
			const { data } = await axios.post(url, { UserName:"youssefahmed",CourseID,Report_Type,Report_Description}); //pass the name of course in CourseID
			setMsg(data.message);
			setError("Course Reported succuessfully");
		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
				setMsg("An error Occured,please revise data");
				}
				}
				};
				return (
					<div className={styles.container}>
						<form className={styles.form_container} onSubmit={handleSubmit}>
							<h1>Report a Course</h1>
							
							<h1>{Report_Type}</h1>
							<input type ="radio" name="Report_Type" value="financial" onChange={e=>setReport(e.target.value)}/>financial
							<input type ="radio" name="Report_Type" value="technical" onChange={e=>setReport(e.target.value)}/>technical
							<input type ="radio" name="Report_Type" value="other" onChange={e=>setReport(e.target.value)}/>other
							
							
							<input
								type="Report_Description"
								placeholder="Report_Description"
								name="Report_Description"
								onChange={(z) => setReportDescription(z.target.value)}
								value={Report_Description}
								required
								className={styles.input}
							/>
							
							{error && <div className={styles.error_msg}>{error}</div>}
							{msg && <div className={styles.success_msg}>{msg}</div>}
							<button className={styles.submit_button} type="submit">
								Submit
							</button>
						</form>
					</div>
				);
}

export default ReportCourse;