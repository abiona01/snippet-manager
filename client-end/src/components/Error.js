import React from "react";
import "../style/errorMessage.scss";

function Error({ message, clear }) {
	return (
		<div className='error-message'>
			<p> {message} </p>
			<button onClick={clear}>X</button>
		</div>
	);
}

export default Error;
