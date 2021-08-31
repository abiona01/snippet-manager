import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const UserContext = createContext();
function UserContextProvider(props) {
	const [user, setUser] = useState(undefined);

	async function getUser() {
		const response = await axios.get("http://localhost:5000/auth/loggedIn");
		setUser(response.data);
	}
	useEffect(() => {
		getUser();
	}, []);
	return (
		<UserContext.Provider value={{ user, getUser }}>
			{props.children}
		</UserContext.Provider>
	);
}

export default UserContext;
export { UserContextProvider };
