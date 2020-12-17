import React from 'react';
import { Link } from 'react-router-dom';

import './HomeScreen.css';

const HomeScreen = () => {
  return (
    <div className='page page--home'>
      <div className='welcome'>
        <h1>Welcome to EXTRA</h1>
      </div>
      <div className='message'>
        <p className='box box--par'>
          <strong>EXTRA</strong> is a user-friendly <strong>Ex</strong>pense{' '}
          <strong>TRA</strong>
          cker that allows you track your income and expenses, and set financial
          goals, to be in control of your finances.
        </p>
      </div>
      <div className='guide'>
        <p>
          It's free. All you need to start is to create an account to associate
          your entries with it.
        </p>
        <p>
          <Link to='/register'>Signup</Link> here
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;
