import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import DetailsDisplayItem from './DetailsDisplayItem';
import Spinner from '../components/Spinner';
import Message from '../components/Message';

import './DetailsDisplay.css';
import { format } from 'date-fns';

const DetailsDisplay = () => {
  const [actionBtnClicked, setActionsBtnClicked] = useState(false);
  const [itemId, setItemId] = useState('');
  // const { filtered, year } = useSelector((state) => state.entriesList);
  // const { filtered, sucess: sucessFiltered } = useSelector(
  //   (state) => state.transactionsFilteredList
  // );
  const { entries, error, loading } = useSelector(
    (state) => state.transactionsList
  );

  // useEffect(() => {
  //   dispatch(listEntries());
  // }, [successAdd, successDelete, successEdit, dispatch]);

  // const incomeEntries = entries.filter((el) => el.type === 'income');
  // const expenseEntries = entries.filter((el) => el.type === 'expense');
  // const incomeEntries =
  //   filtered.length === 0 //&& year !== 'Year' && year !== 'all'
  //     ? []
  //     : filtered.length === 0 && entries.length > 0
  //     ? entries.filter((el) => el.type === 'income')
  //     : filtered.length > 0
  //     ? filtered.filter((el) => el.type === 'income')
  //     : [];
  // console.log(incomeEntries);
  // const expenseEntries =
  //   filtered.length === 0 //&& year !== 'Year' && year !== 'all'
  //     ? []
  //     : filtered.length === 0 && entries.length > 0
  //     ? entries.filter((el) => el.type === 'expense')
  //     : filtered.length > 0
  //     ? filtered.filter((el) => el.type === 'expense')
  //     : [];
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

  const entriesByYearMonth = entries.reduce((accumulator, item) => {
    const itemYear = format(new Date(item.createdAt), 'yyyy');
    const itemMonth = format(new Date(item.createdAt), 'MMMM');
    accumulator[itemYear] = accumulator[itemYear] || {};
    accumulator[itemYear][itemMonth] = accumulator[itemYear][itemMonth] || [];
    accumulator[itemYear][itemMonth].push(item);
    return accumulator;
  }, {});

  // const entriesByYearMonthArr = Object.entries(entriesByYearMonth).sort(
  //   (a, b) => b[0] - a[0]
  // );

  // console.log(
  //   Object.fromEntries(
  //     Object.entries(incomeEntriesByYearMonth).sort( )
  //   ).reduce((o, [k, v]) => ((o[k] = v), o), {})
  // );
  // const expenseEntriesByYearMonth = expenseEntries.reduce(
  //   (accumulator, item) => {
  //     accumulator[item.year] = accumulator[item.year] || {};
  //     accumulator[item.year][item.month] =
  //       accumulator[item.year][item.month] || [];
  //     accumulator[item.year][item.month].push(item);
  //     return accumulator;
  //   },
  //   {}
  // );

  // const expenseEntriesByYearMonthArr = Object.entries(
  //   expenseEntriesByYearMonth
  // ).sort((a, b) => b[0] - a[0]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        error && <Message variant='danger'>{error}</Message>
      )}
      <div className='details-display'>
        <DetailsDisplayItem
          // entries={entriesByYearMonthArr}
          entries={entriesByYearMonth}
          actionBtnClicked={actionBtnClicked}
          setActionsBtnClicked={setActionsBtnClicked}
          itemId={itemId}
          setItemId={setItemId}
        />
        {/* <DetailsDisplayItem
          entries={expenseEntriesByYearMonthArr}
          actionBtnClicked={actionBtnClicked}
          setActionsBtnClicked={setActionsBtnClicked}
          itemId={itemId}
          setItemId={setItemId}
        /> */}
      </div>
    </>
  );
};

export default DetailsDisplay;
