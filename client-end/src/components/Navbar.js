import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext, { BASE_URL } from '../context/userContext';
import '../style/navbar.scss';

function Navbar() {
  const { user, getUser } = useContext(UserContext);

  async function logOut() {
    await axios.get(`${BASE_URL}/auth/logOut`);
    await getUser();
  }
  return (
    <div className='navbar'>
      <Link to='/'>
        <h2>Snippet Manager</h2>
      </Link>
      {user === null ? (
        <>
          <Link to='/login'>Login</Link>
          <Link to='/register'>Register</Link>
        </>
      ) : (
        user && (
          <button className='btn-logout' onClick={logOut}>
            Logout
          </button>
        )
      )}
    </div>
  );
}

export default Navbar;
