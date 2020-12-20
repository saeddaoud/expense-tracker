import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';

import './NavBar.css';

const NavBar = () => {
  const { userInfo } = useSelector((state) => state.userLogin);
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className='navbar'>
      <div className='logo'>
        <h1>EXTRA</h1>
      </div>
      <div className='menu'>
        <ul className='list'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            {userInfo ? (
              <Link to='/login' onClick={logoutHandler}>
                Log out
              </Link>
            ) : (
              <Link to='/login'>Log in</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
