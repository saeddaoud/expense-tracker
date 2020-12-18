import React from 'react';
import { Link } from 'react-router-dom';

import './NavBar.css';

const NavBar = () => {
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
            <Link to='/login'>Log in</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavBar;
