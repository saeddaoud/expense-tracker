import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listEntries } from '../actions/transactionActions';
import DetailsDisplay from '../components/DetailsDisplay';
import DropDownDate from '../components/DropDownDate';
import SetAmount from '../components/SetAmount';
import TotalDisplay from '../components/TotalDisplay';

import './TransactionsScreen.css';

const TransactionsScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [year, setYear] = useState('Year');
  const [month, setMonth] = useState('Month');

  const { userInfo: userInfoLogin } = useSelector((state) => state.userLogin);
  const { userInfo: userInfoRegister } = useSelector(
    (state) => state.userRegister
  );

  useEffect(() => {
    if (!userInfoLogin && !userInfoRegister) history.push('/login');
    dispatch(
      listEntries(year !== 'Year' ? year : '', month !== 'Month' ? month : '')
    );
  }, [userInfoLogin, userInfoRegister, history, year, month]);
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
      <DropDownDate
        year={year}
        month={month}
        setYear={setYear}
        setMonth={setMonth}
        // flexDirection='column'
        filter={true}
      />
      <DetailsDisplay />
    </div>
  );
};

export default TransactionsScreen;
