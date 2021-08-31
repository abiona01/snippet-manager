import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./style/index.scss";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./components/auth/Register";
import axios from "axios";
import Login from "./components/auth/Login";
import { UserContextProvider } from "./context/userContext";

axios.defaults.withCredentials = true;

function App() {
	return (
		<UserContextProvider>
			<div className='container'>
				<Router>
					<Navbar />
					<Switch>
						<Route exact path='/'>
							<Home />
						</Route>
						.
						<Route path='/login'>
							<Login />{" "}
						</Route>
						<Route path='/register'>
							<Register />{" "}
						</Route>
					</Switch>
				</Router>
			</div>
		</UserContextProvider>
	);
}

export default App;
