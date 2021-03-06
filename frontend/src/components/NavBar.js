import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../actions/userActions';

import './NavBar.css';

const NavBar = () => {
  const { userInfo: userInfoLogin } = useSelector((state) => state.userLogin);
  const { userInfo: userInforRegister } = useSelector(
    (state) => state.userRegister
  );
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className='header'>
      <div className='navbar'>
        <div className='logo'>
          <h1>EXTRA</h1>
        </div>
        <div className='menu'>
          <ul className='list'>
            <li>
              {!userInfoLogin && !userInforRegister && <Link to='/'>Home</Link>}
            </li>
            <li>
              {userInfoLogin || userInforRegister ? (
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
    </header>
  );
};

export default NavBar;
