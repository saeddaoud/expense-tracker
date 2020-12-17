import React from 'react';
import DetailsDisplay from '../components/DetailsDisplay';
import SetAmount from '../components/SetAmount';
import TotalDisplay from '../components/TotalDisplay';

const TransactionsScreen = () => {
  return (
    <>
      <h1>EXTRA: EXpense TRAcker</h1>
      <TotalDisplay />
      <SetAmount />
      <DetailsDisplay />
    </>
  );
};

export default TransactionsScreen;
