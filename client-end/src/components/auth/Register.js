import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import "../../style/authForm.scss";
import Error from "../Error";

function Register() {
	const [formEmail, setFormEmail] = useState("");
	const [formPassword, setFormPassword] = useState("");
	const [formPasswordVerify, setFormPasswordVerify] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);

	const { getUser } = useContext(UserContext);
	const history = useHistory();
	async function register(e) {
		e.preventDefault();

		const registerData = {
			email: formEmail,
			password: formPassword,
			passwordVerify: formPasswordVerify,
		};
		try {
			await axios.post("http://localhost:5000/auth/", registerData);
		} catch (err) {
			if (err.response) {
				if (err.response.data.errorMessage) {
					setErrorMessage(err.response.data.errorMessage);
				}
			}
			return;
		}
		await getUser();
		history.push("/");
	}
	return (
		<div className='authform'>
			<h2>Register a new account</h2>
			{errorMessage && (
				<Error message={errorMessage} clear={() => setErrorMessage(null)} />
			)}
			<form onSubmit={register} className='form'>
				<label htmlFor='form-email'>Email</label>
				<input
					type='email'
					id='form-email'
					value={formEmail}
					onChange={(e) => setFormEmail(e.target.value)}
				/>
				<label htmlFor='form-password'>Password</label>
				<input
					type='password'
					id='form-password'
					value={formPassword}
					onChange={(e) => setFormPassword(e.target.value)}
				/>
				<label htmlFor='form-passwordVerify'>Verify password</label>
				<input
					type='password'
					id='form-passwordVerify'
					value={formPasswordVerify}
					onChange={(e) => setFormPasswordVerify(e.target.value)}
				/>
				<button className='btn-submit' type='submit'>
					Register
				</button>
			</form>
			<p>
				Already have an account? <Link to='/login'>Login instead</Link>{" "}
			</p>
		</div>
	);
}

export default Register;
