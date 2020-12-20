import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../components/Spinner';
import Message from '../components/Message';

import './LoginScreen.css';
import { loginUser } from '../actions/userActions';

const LogninScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.userLogin);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (userInfo) history.push('/transactions/me');
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className='wrapper'>
      {loading ? (
        <Spinner />
      ) : (
        error && <Message variant='danger'>{error}</Message>
      )}
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
    </div>
  );
};

export default LogninScreen;
