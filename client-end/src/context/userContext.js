import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

export const BASE_URL =
  process.env.REACT_APP_BASE_URL || 'http://localhost:5000';
const UserContext = createContext();
function UserContextProvider(props) {
  const [user, setUser] = useState(undefined);

  async function getUser() {
    const response = await axios.get(`${BASE_URL}/auth/loggedIn`);
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
