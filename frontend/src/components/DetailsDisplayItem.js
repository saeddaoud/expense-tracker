import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteEntry, fetchEntry } from '../actions/transactionActions';
import AddForm from './AddForm';
import { format } from 'date-fns';

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
        {entries.map((entry, entryIndex) => {
          return (
            <div className='entry-year'>
              {entryIndex === 0 && (
                <span>{format(new Date(entry.createdAt), 'yyyy')}</span>
              )}
              <div className='entry-month'>
                {entryIndex === 0 && (
                  <span>{format(new Date(entry.createdAt), 'MMMM')}</span>
                )}

                <div className='details-display-item' key={entry._id}>
                  <div className='item__date'>
                    {format(new Date(entry.createdAt), 'EEEEEE do')}
                    {/* {el.createdAt
                          .toString()
                          .substring(0, 10)
                          .split('-')
                          .join('/')} */}
                  </div>
                  <div className='item__title'>{entry.title}</div>
                  <div className='right'>
                    <div
                      className={
                        entry.type === 'income'
                          ? 'item__amount income'
                          : 'item__amount expense'
                      }
                    >
                      ${entry.amount}
                    </div>
                    <div className='actions'>
                      <div
                        className='options-btn'
                        onClick={() => {
                          setActionsBtnClicked(!actionBtnClicked);
                          setItemId(entry._id);
                        }}
                      >
                        <i className='fas fa-ellipsis-v'></i>
                      </div>
                      {actionBtnClicked && `${entry._id}` === `${itemId}` && (
                        <div className='actions__menu'>
                          <ul>
                            <li onClick={() => handleEditClick(entry._id)}>
                              Edit
                            </li>
                            <li onClick={() => handleDeleteClick(entry._id)}>
                              Delete
                            </li>
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DetailsDisplayItem;
