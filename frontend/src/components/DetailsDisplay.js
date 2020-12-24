import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import DetailsDisplayItem from './DetailsDisplayItem';
import Spinner from '../components/Spinner';
import Message from '../components/Message';

import './DetailsDisplay.css';
import { listEntries } from '../actions/transactionActions';

const DetailsDisplay = () => {
  const dispatch = useDispatch();
  const [actionBtnClicked, setActionsBtnClicked] = useState(false);
  const [itemId, setItemId] = useState('');
  const { filtered, year } = useSelector((state) => state.entriesList);
  const { entries, error, loading } = useSelector(
    (state) => state.transactionsList
  );
  console.log(entries);
  const { success: successAdd } = useSelector((state) => state.transactionAdd);
  const { success: successDelete } = useSelector(
    (state) => state.transactionDelete
  );
  const { success: successEdit } = useSelector(
    (state) => state.transactionEdit
  );

  useEffect(() => {
    dispatch(listEntries());
  }, [successAdd, successDelete, successEdit]);

  const incomeEntries =
    filtered.length === 0 && year !== 'Year' && year !== 'all'
      ? []
      : filtered.length === 0 && entries.length > 0
      ? entries.filter((el) => el.type === 'income')
      : filtered.length > 0
      ? filtered.filter((el) => el.type === 'income')
      : [];
  console.log(incomeEntries);
  const expenseEntries =
    filtered.length === 0 && year !== 'Year' && year !== 'all'
      ? []
      : filtered.length === 0 && entries.length > 0
      ? entries.filter((el) => el.type === 'expense')
      : filtered.length > 0
      ? filtered.filter((el) => el.type === 'expense')
      : [];
  // This function group entries by year and month with each year, but it's difficult to understand
  // ********************************************************
  //   const mapObject = (fn) => (obj) =>
  //   Object .fromEntries (Object .entries (obj) .map (([k, v]) => [k, fn (v)]))

  // const group = (prop) => (xs) =>
  //   xs .reduce ((a, {[prop]: p, ...rest}) => ({
  //     ... a,
  //     [p] : [...(a[p] || []), rest]
  //   }), {})

  // const groupByYearAndMonth = (input) =>
  //   mapObject (group ('month')) (group ('year') (input))
  // *******************************************************************

  const incomeEntriesByYearMonth = incomeEntries.reduce((accumulator, item) => {
    accumulator[item.year] = accumulator[item.year] || {};
    accumulator[item.year][item.month] =
      accumulator[item.year][item.month] || [];
    accumulator[item.year][item.month].push(item);
    return accumulator;
  }, {});

  const incomeEntriesByYearMonthArr = Object.entries(
    incomeEntriesByYearMonth
  ).sort((a, b) => b[0] - a[0]);

  // console.log(
  //   Object.fromEntries(
  //     Object.entries(incomeEntriesByYearMonth).sort( )
  //   ).reduce((o, [k, v]) => ((o[k] = v), o), {})
  // );
  const expenseEntriesByYearMonth = expenseEntries.reduce(
    (accumulator, item) => {
      accumulator[item.year] = accumulator[item.year] || {};
      accumulator[item.year][item.month] =
        accumulator[item.year][item.month] || [];
      accumulator[item.year][item.month].push(item);
      return accumulator;
    },
    {}
  );

  const expenseEntriesByYearMonthArr = Object.entries(
    expenseEntriesByYearMonth
  ).sort((a, b) => b[0] - a[0]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        error && <Message variant='danger'>{error}</Message>
      )}
      <div className='details-display'>
        <DetailsDisplayItem
          entries={incomeEntriesByYearMonthArr}
          actionBtnClicked={actionBtnClicked}
          setActionsBtnClicked={setActionsBtnClicked}
          itemId={itemId}
          setItemId={setItemId}
        />
        <DetailsDisplayItem
          entries={expenseEntriesByYearMonthArr}
          actionBtnClicked={actionBtnClicked}
          setActionsBtnClicked={setActionsBtnClicked}
          itemId={itemId}
          setItemId={setItemId}
        />
      </div>
    </>
  );
};

export default DetailsDisplay;
