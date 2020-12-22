import React, { useEffect, useState } from 'react';
import BackDrop from './BackDrop';
import './AddForm.css';
import { useDispatch, useSelector } from 'react-redux';
import { addEntry, editEntry } from '../actions/transactionActions';
import { RESET_ENTRY } from '../constants.js/transactionConstants';
import DropDownDate from './DropDownDate';

const AddForm = ({ setAddClicked }) => {
  const { entry } = useSelector((state) => state.entriesList);

  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [entryType, setEntryType] = useState('type');
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [titleErr, setTitleErr] = useState('');
  const [amountErr, setAmountErr] = useState('');
  const [yearErr, setYearErr] = useState('');
  const [monthErr, setMonthErr] = useState('');
  const [typeErr, setTypeErr] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setAmount(entry.amount);
      setEntryType(entry.entryType);
      setYear(entry.year);
      setMonth(entry.month);
    }
  }, [entry]);

  useEffect(() => {
    if (titleErr !== '') {
      if (title !== '') setTitleErr('');
    }
    if (amountErr !== '') {
      if (amount !== '' && !isNaN(amount)) setAmountErr('');
    }
    if (yearErr !== '') {
      if (year !== 'Year') setYearErr('');
    }
    if (monthErr !== '') {
      if (month !== 'Month') setMonthErr('');
    }
    if (typeErr !== '') {
      if (entryType !== 'type') setTypeErr('');
    }
  }, [title, amount, entryType, year, month]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      title !== '' &&
      amount !== '' &&
      !isNaN(amount) &&
      year !== 'Year' &&
      month !== 'Month' &&
      entryType !== 'type'
    ) {
      if (entry) {
        dispatch(
          editEntry({
            id: entry.id,
            entryType,
            title,
            amount,
            year,
            month,
          })
        );
        dispatch({ type: RESET_ENTRY });
      } else {
        dispatch(
          addEntry({
            type: entryType,
            title,
            amount,
            year,
            month,
          })
        );
      }
      setTitle('');
      setAmount('');
      // setEntry('income');
      // setAddClicked(false);
    } else {
      if (title === '') setTitleErr('This field is required');
      if (amount === '') setAmountErr('This field is required');
      if (isNaN(amount)) setAmountErr('This field accepts numeric values only');
      if (year === 'Year') setYearErr('Select Year');
      if (month === 'Month') setMonthErr('Select Month');
      if (entryType === 'type') setTypeErr('Select Type');
    }
  };
  return (
    <>
      <BackDrop setAddClicked={setAddClicked} />
      <form className='add-form' onSubmit={handleSubmit}>
        <div className='close-btn' onClick={() => setAddClicked(false)}>
          <i className='fas fa-times'></i>
        </div>
        <div className='add-form__control add-form__control-top'>
          <div className='control-top__select'>
            <select
              name='entry'
              value={entryType}
              onChange={(e) => setEntryType(e.target.value)}
              className='add-form__el add-form__el--select'
            >
              <option value='type' disabled>
                Type
              </option>
              <option value='income'>Income</option>
              <option value='expense'>Expense</option>
            </select>
            {typeErr && <div className='error'>{typeErr}</div>}
          </div>

          <DropDownDate
            year={year}
            month={month}
            setYear={setYear}
            setMonth={setMonth}
            setYearErr={setYearErr}
            setMonthErr={setMonthErr}
            yearErr={yearErr}
            monthErr={monthErr}
          />
        </div>
        <div className='add-form__control'>
          {/* <label htmlFor='title'>Title</label> */}
          <div className='control__label'>Title</div>
          <input
            type='text'
            name='title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='add-form__el'
            id='title'
          />
          {titleErr && <span className='error'>{titleErr}</span>}
        </div>
        <div className='add-form__control'>
          <div className='control__label'>Amount</div>
          <input
            type='text'
            name='amount'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='add-form__el'
          />
          {amountErr && <span className='error'>{amountErr}</span>}
        </div>
        <div className='add-form__control'>
          <button className='submit-btn' type='submit'>
            {entry ? 'Edit' : 'Add'}
          </button>{' '}
        </div>
      </form>
    </>
  );
};

export default AddForm;
