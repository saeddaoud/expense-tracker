import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DetailsDisplay from '../components/DetailsDisplay';
import SetAmount from '../components/SetAmount';
import TotalDisplay from '../components/TotalDisplay';

import './TransactionsScreen.css';

const TransactionsScreen = ({ history }) => {
  const { userInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (!userInfo) history.push('/login');
  }, [userInfo, history]);
  return (
    <div className='page page--transactions'>
      <TotalDisplay />
      <SetAmount />
      <DetailsDisplay />
    </div>
  );
};

export default TransactionsScreen;
