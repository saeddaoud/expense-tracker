import React from 'react';
import DetailsDisplay from '../components/DetailsDisplay';
import SetAmount from '../components/SetAmount';
import TotalDisplay from '../components/TotalDisplay';

import './TransactionsScreen.css';

const TransactionsScreen = () => {
  return (
    <div className='page page--transactions'>
      <TotalDisplay />
      <SetAmount />
      <DetailsDisplay />
    </div>
  );
};

export default TransactionsScreen;
