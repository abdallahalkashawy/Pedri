import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const AddInstructor = () => {
    const [Password, setnewID] = useState("");
	const [UserName, setnewPass] = useState("");
	const [email, setemail] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:5000/addingInstructor`;
			const { data } = await axios.post(url, { UserName,Password,email});
			setMsg(data.message);
			setError("Instructor added succuessfully");
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
				<h1>Add a new Instructor</h1>
				<input
					type="UserName"
					placeholder="UserName"
					name="UserName"
					onChange={(e) => setnewPass(e.target.value)}
					value={UserName}
					required
					className={styles.input}
				/>
                <input
					type="Password"
					placeholder="Password"
					name="Password"
					onChange={(x) => setnewID(x.target.value)}
					value={Password}
					required
					className={styles.input}
				/>
				<input
					type="email"
					placeholder="email"
					name="email"
					onChange={(z) => setemail(z.target.value)}
					value={email}
					required
					className={styles.input}
				/>
				{error && <div className={styles.error_msg}>{error}</div>}
				{msg && <div className={styles.success_msg}>{msg}</div>}
				<button type="submit" className={styles.green_btn}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddInstructor;