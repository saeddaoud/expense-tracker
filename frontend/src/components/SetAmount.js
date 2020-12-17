import React, { useState } from 'react';
import AddForm from './AddForm';
import './SetAmount.css';

const SetAmount = () => {
  const [addClicked, setAddClicked] = useState(false);
  return (
    <div className='set-amount'>
      {addClicked && <AddForm setAddClicked={setAddClicked} />}
      <div className='add-amount' onClick={() => setAddClicked(true)}>
        <i className='fas fa-plus-circle'></i>
      </div>
    </div>
  );
};

export default SetAmount;
