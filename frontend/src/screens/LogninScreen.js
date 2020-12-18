import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './LoginScreen.css';

const LogninScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className='page page--login'>
      <form className='form'>
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
