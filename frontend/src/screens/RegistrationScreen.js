import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Spinner from '../components/Spinner';
import Message from '../components/Message';

import './RegistrationScreen.css';
import { registerUser } from '../actions/userActions';

const RegistrationScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { loading, error, userInfo } = useSelector(
    (state) => state.userRegister
  );

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const [passwordMatchErr, setPasswordMatchErr] = useState('');

  useEffect(() => {
    if (userInfo) {
      history.push('/transactions/me');
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setPasswordMatchErr('Passwords do not match');
    } else {
      dispatch(registerUser({ name, email, password }));
    }
  };
  return (
    <div className='wrapper'>
      {loading ? (
        <Spinner />
      ) : (
        error && <Message variant='danger'>{error}</Message>
      )}
      <div className='page page--register'>
        <form className='form' onSubmit={submitHandler}>
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
            {passwordMatchErr && (
              <small className='pass-error'>{passwordMatchErr}</small>
            )}
          </div>
          <button type='submit' className='btn'>
            Submit
          </button>
        </form>
        <p>
          Already have an account? <Link to='/login'>Log in</Link> here.
        </p>
      </div>
    </div>
  );
};

export default RegistrationScreen;
