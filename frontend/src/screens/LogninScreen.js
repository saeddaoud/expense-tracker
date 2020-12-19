import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './LoginScreen.css';
import { loginUser } from '../actions/userActions';

const LogninScreen = () => {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className='page page--login'>
      <form className='form' onSubmit={submitHandler}>
        <div className='form-control'>
          <input
            type='email'
            name='email'
            value={email}
            placeholder='Enter your email'
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <input
            type='password'
            name='password'
            value={password}
            placeholder='Enter your password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type='submit' className='btn'>
          Submit
        </button>
      </form>
      <p>
        Don't have an account? <Link to='/register'>Sign up</Link> here.
      </p>
    </div>
  );
};

export default LogninScreen;
