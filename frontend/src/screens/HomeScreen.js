import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './HomeScreen.css';

const HomeScreen = ({ history }) => {
  const { userInfo } = useSelector((state) => state.userLogin);
  useEffect(() => {
    if (userInfo) history.push('/transactions/me');
  }, [userInfo, history]);
  return (
    <div className='page page--home'>
      <div className='welcome'>
        <h1>Welcome to EXTRA</h1>
        <p>
          <strong>
            <em>Be in control of your finances.</em>{' '}
          </strong>
        </p>
      </div>
      <div className='message'>
        <p className='box box--par'>
          <strong>EXTRA</strong> is a user-friendly <strong>Ex</strong>pense{' '}
          <strong>TRA</strong>
          cker that allows you track your income and expenses, and set financial
          goals.
        </p>
      </div>
      <div className='guide'>
        <p>
          New user? <Link to='/register'>Sign up</Link> here
        </p>
        <p>
          Already have an account? <Link to='/login'>Log in</Link> here
        </p>
      </div>
    </div>
  );
};

export default HomeScreen;
