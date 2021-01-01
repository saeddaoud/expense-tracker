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

  const { year: yearList, month: monthList } = useSelector(
    (state) => state.transactionsList
  );

  const [year, setYear] = useState(yearList);
  const [month, setMonth] = useState(monthList);

  const { userInfo: userInfoLogin } = useSelector((state) => state.userLogin);
  const { userInfo: userInfoRegister } = useSelector(
    (state) => state.userRegister
  );

  useEffect(() => {
    if (!userInfoLogin && !userInfoRegister) history.push('/login');
    dispatch(
      listEntries(year !== 'Year' ? year : '', month !== 'Month' ? month : '')
    );
  }, [userInfoLogin, userInfoRegister, history, year, month, dispatch]);
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
