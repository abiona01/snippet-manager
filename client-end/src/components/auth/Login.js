import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import UserContext from "../../context/userContext";
import "../../style/authForm.scss";
import Error from "../Error";

function Login() {
	const [formEmail, setFormEmail] = useState("");
	const [formPassword, setFormPassword] = useState("");
	const [errorMessage, setErrorMessage] = useState(null);

	const { getUser } = useContext(UserContext);
	const history = useHistory();

	async function login(e) {
		e.preventDefault();

		const loginData = {
			email: formEmail,
			password: formPassword,
		};

		try {
			await axios.post("http://localhost:5000/auth/login/", loginData);
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
			<h2>Login a new account</h2>
			{errorMessage && (
				<Error message={errorMessage} clear={() => setErrorMessage(null)} />
			)}
			<form onSubmit={login} className='form'>
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
				<label htmlFor='form-passwordVerify'></label>

				<button className='btn-submit' type='submit'>
					Login
				</button>
			</form>
			<p>
				Don't have an account yet? <Link to='/register'>Register here</Link>{" "}
			</p>
		</div>
	);
}

export default Login;
