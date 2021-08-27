import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./style/index.scss";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
	return (
		<div className='container'>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path='/'>
						<Home />
					</Route>
					<Route path='/login'>Login</Route>
					<Route path='/register'>Register</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
