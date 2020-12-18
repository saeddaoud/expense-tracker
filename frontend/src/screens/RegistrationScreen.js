import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './RegistrationScreen.css';

const RegistrationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  return (
    <div className='page page--register'>
      <form className='form'>
        <div className='form-control'>
          <input
            type='text'
            name='name'
            value={name}
            placeholder='Enter a name'
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className='form-control'>
          <input
            type='email'
            name='email'
            value={email}
            placeholder='Enter a valid email'
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
        <div className='form-control'>
          <input
            type='password'
            name='password2'
            value={password2}
            placeholder='Confirm password'
            onChange={(e) => setPassword2(e.target.value)}
          />
        </div>
        <button type='submit' className='btn'>
          Submit
        </button>
      </form>
      <p>
        Already have an account? <Link to='/login'>Log in</Link> here.
      </p>
    </div>
  );
};

export default RegistrationScreen;
