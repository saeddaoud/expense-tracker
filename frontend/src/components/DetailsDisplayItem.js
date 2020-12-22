import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteEntry, fetchEntry } from '../actions/transactionActions';
import AddForm from './AddForm';

import './DetailsDisplayItem.css';

const DetailsDisplayItem = ({
  entries,
  actionBtnClicked,
  setActionsBtnClicked,
  itemId,
  setItemId,
}) => {
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const handleEditClick = (entryId) => {
    dispatch(fetchEntry(entryId));
    setEdit(true);
    setActionsBtnClicked(false);
  };
  const handleDeleteClick = (entryId) => {
    dispatch(deleteEntry(entryId));
    setActionsBtnClicked(false);
  };

  return (
    <>
      {edit && <AddForm setAddClicked={setEdit} />}
      <div className='details-display-container'>
        {entries.map((yearEntry) => (
          <div className='entry-year' key={yearEntry[0]}>
            <span>{yearEntry[0]}</span>
            {Object.entries(yearEntry[1])
              .sort(
                (a, b) => new Date(b[0] + '1-2020') - new Date(a[0] + '1-2020')
              )
              .map((monthEntry) => (
                <div className='entry-month' key={monthEntry[0]}>
                  <span>{monthEntry[0]}</span>
                  {monthEntry[1].map((el) => (
                    <div className='details-display-item' key={el.id}>
                      <div className='item__title'>{el.title}</div>
                      <div className='right'>
                        <div
                          className={
                            el.entryType === 'income'
                              ? 'item__amount income'
                              : 'item__amount expense'
                          }
                        >
                          ${el.amount}
                        </div>
                        <div className='actions'>
                          <div
                            className='options-btn'
                            onClick={() => {
                              setActionsBtnClicked(!actionBtnClicked);
                              setItemId(el.id);
                            }}
                          >
                            <i className='fas fa-ellipsis-v'></i>
                          </div>
                          {actionBtnClicked && el.id === itemId && (
                            <div className='actions__menu'>
                              <ul>
                                <li onClick={() => handleEditClick(el.id)}>
                                  Edit
                                </li>
                                <li onClick={() => handleDeleteClick(el.id)}>
                                  Delete
                                </li>
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default DetailsDisplayItem;
