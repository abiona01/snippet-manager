import React from "react";
import { Link } from "react-router-dom";
import "../style/navbar.scss";

function Navbar() {
	return (
		<div className='navbar'>
			<Link to='/'>
				<h2>Snippet Manager</h2>
			</Link>
			<Link to='/login'>Login</Link>
			<Link to='/register'>Register</Link>
		</div>
	);
}

export default Navbar;
