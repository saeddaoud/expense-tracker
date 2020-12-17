import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import DetailsDisplayItem from './DetailsDisplayItem';

import './DetailsDisplay.css';

const DetailsDisplay = () => {
  const [actionBtnClicked, setActionsBtnClicked] = useState(false);
  const [itemId, setItemId] = useState('');
  const { entries, filtered, year } = useSelector((state) => state.entriesList);

  const incomeEntries =
    filtered.length === 0 && year !== 'Year' && year !== 'all'
      ? []
      : filtered.length === 0 && entries.length > 0
      ? entries.filter((el) => el.entryType === 'income')
      : filtered.length > 0
      ? filtered.filter((el) => el.entryType === 'income')
      : [];
  const expenseEntries =
    filtered.length === 0 && year !== 'Year' && year !== 'all'
      ? []
      : filtered.length === 0 && entries.length > 0
      ? entries.filter((el) => el.entryType === 'expense')
      : filtered.length > 0
      ? filtered.filter((el) => el.entryType === 'expense')
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
  );
};

export default DetailsDisplay;
