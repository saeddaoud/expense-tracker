import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DetailsDisplay from '../components/DetailsDisplay';
import SetAmount from '../components/SetAmount';
import TotalDisplay from '../components/TotalDisplay';

import './TransactionsScreen.css';

const TransactionsScreen = ({ history }) => {
  const { userInfo: userInfoLogin } = useSelector((state) => state.userLogin);
  const { userInfo: userInfoRegister } = useSelector(
    (state) => state.userRegister
  );

  useEffect(() => {
    if (!userInfoLogin && !userInfoRegister) history.push('/login');
  }, [userInfoLogin, userInfoRegister, history]);
  return (
    <div className='page page--transactions'>
      <div className='hello'>
        <h1>
          Hello,{' '}
          <span>
            {userInfoRegister
              ? userInfoRegister.name.split(' ')[0]
              : userInfoLogin.name.split(' ')[0]}
          </span>
        </h1>
      </div>
      <TotalDisplay />
      <SetAmount />
      <DetailsDisplay />
    </div>
  );
};

export default TransactionsScreen;
