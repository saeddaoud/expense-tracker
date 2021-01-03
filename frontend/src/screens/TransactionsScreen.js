import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listEntries } from '../actions/transactionActions';
import DetailsDisplay from '../components/DetailsDisplay';
import DropDownDate from '../components/DropDownDate';
import SetAmount from '../components/SetAmount';
import TotalDisplay from '../components/TotalDisplay';

import './TransactionsScreen.css';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const monthsObj = {
  January: '0',
  February: '1',
  March: '2',
  April: '3',
  May: '4',
  June: '5',
  July: '6',
  August: '7',
  September: '8',
  October: '9',
  November: '10',
  December: '11',
};

const TransactionsScreen = ({ history }) => {
  const dispatch = useDispatch();

  // const { year: yearList, month: monthList } = useSelector(
  //   (state) => state.transactionsList
  // );

  const yearRef = useRef(new Date().getFullYear() + '');
  const monthRef = useRef(months[new Date().getMonth()] + '');

  const [year, setYear] = useState(yearRef.current);
  const [month, setMonth] = useState(monthRef.current);

  const { success: successEdit } = useSelector(
    (state) => state.transactionEdit
  );
  const { success: successDelete } = useSelector(
    (state) => state.transactionDelete
  );
  const { success: successAdd } = useSelector((state) => state.transactionAdd);

  const { userInfo: userInfoLogin } = useSelector((state) => state.userLogin);
  const { userInfo: userInfoRegister } = useSelector(
    (state) => state.userRegister
  );

  // console.log(year, months[month], monthsObj[month]);

  useEffect(() => {
    if (!userInfoLogin && !userInfoRegister) history.push('/login');
    dispatch(listEntries(yearRef.current, monthsObj[monthRef.current]));
  }, [
    userInfoLogin,
    userInfoRegister,
    history,
    // year,
    // month,
    dispatch,
    successEdit,
    successDelete,
    successAdd,
    yearRef.current,
    monthRef.current,
  ]);
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
        yearRef={yearRef}
        monthRef={monthRef}
      />
      <DetailsDisplay />
    </div>
  );
};

export default TransactionsScreen;
