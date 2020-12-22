import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filterEntries } from '../actions/transactionActions';
import DropDownDate from './DropDownDate';
import './TotalDisplay.css';

const TotalDisplay = () => {
  const dispatch = useDispatch();
  const [year, setYear] = useState('Year');
  const [month, setMonth] = useState('Month');
  const { entries, filtered } = useSelector((state) => state.entriesList);

  useEffect(() => {
    dispatch(filterEntries(year));
  }, [year, entries]);

  const incomeEntries =
    filtered.length === 0 && year !== 'Year' && year !== 'all'
      ? []
      : filtered.length === 0 && entries.length > 0
      ? entries.filter((el) => el.entryType === 'income')
      : filtered.length > 0
      ? filtered.filter((el) => el.entryType === 'income')
      : [];
  const totalIncome = incomeEntries.reduce(
    (acc, cur) => acc + Number(cur.amount),
    0
  );
  const expenseEntries =
    filtered.length === 0 && year !== 'Year' && year !== 'all'
      ? []
      : filtered.length === 0 && entries.length > 0
      ? entries.filter((el) => el.entryType === 'expense')
      : filtered.length > 0
      ? filtered.filter((el) => el.entryType === 'expense')
      : [];
  const totalExpense = expenseEntries.reduce(
    (acc, cur) => acc + Number(cur.amount),
    0
  );

  return (
    <div className='display-total'>
      <div className='display-total__el display-total__balance'>
        <DropDownDate
          year={year}
          month={month}
          setYear={setYear}
          setMonth={setMonth}
          flexDirection='column'
          filter={true}
        />
        <div className='total-balance__amount'>
          <h3>Total Balance</h3>
          <span>${totalIncome - totalExpense}</span>
        </div>
      </div>
      <div className='display-total__el display-total__income'>
        <h3>Total Income</h3>
        <span>${totalIncome}</span>
      </div>
      <div className='display-total__el display-total__expenses'>
        <h3>Total Expenses</h3>
        <span>${totalExpense}</span>
      </div>
    </div>
  );
};

export default TotalDisplay;
