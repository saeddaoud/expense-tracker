import React from 'react';
import './BackDrop.css';

const BackDrop = ({ setAddClicked }) => {
  return <div className='back-drop' onClick={() => setAddClicked(false)}></div>;
};

export default BackDrop;
