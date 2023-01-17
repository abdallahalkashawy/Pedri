import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const AddAdmin = () => {
    const [Password, setnewID] = useState("");
	const [UserName, setnewPass] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:5000/addingAdmin`;
			const { data } = await axios.post(url, { UserName,Password});
			setError("Admin added succuessfully");
			setMsg(data.message);
		} catch (error) {
			if (
				error.response &&
				error.response.status === 400
			) {
                setError("An error Occured,please revise data")
				setMsg(error.response.data.message);
			} else if (error.response.status >= 500 ) {
                setError("An error Occured,please try later")
				setMsg("already exists");
			}
		}
	};

	return (
		<div className={styles.container}>
			<form className={styles.form_container} onSubmit={handleSubmit}>
				<h1>Add a new Administrator</h1>
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
				{error && <div className={styles.error_msg}>{error}</div>}
				{msg && <div className={styles.success_msg}>{msg}</div>}
				<button type="submit" className={styles.green_btn}>
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddAdmin;
