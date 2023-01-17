import { useState } from "react";
import axios from "axios";
import styles from "./styles.module.css";

const ChangePassword = () => {
    
	const [newPass, setnewPass] = useState("");
	const [msg, setMsg] = useState("");
	const [error, setError] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = `http://localhost:5000/changepass`;
			const { data } = await axios.post(url, { newPass, id:"63b89a558d16b591be1c916f"});
			setMsg(data.message);
			setError("Password Changed succuessfully");
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
				<h1>Change Password</h1>
				<input
					type="password"
					placeholder="NewPass"
					name="newPass"
					onChange={(e) => setnewPass(e.target.value)}
					value={newPass}
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

export default ChangePassword;