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
        {Object.entries(entries).map((yearEntries) => {
          return (
            <div className='entry-year' key={`${yearEntries[0]}-year`}>
              {/* <span>{yearEntries[0]}</span> */}
              {Object.entries(yearEntries[1]).map((monthEntries) => {
                return (
                  <div className='entry-month' key={`${monthEntries[0]}-month`}>
                    {/* <span>{monthEntries[0]}</span> */}
                    {monthEntries[1]
                      .sort((a, b) => {
                        const aDate = new Date(a.createdAt);
                        const bDate = new Date(b.createdAt);
                        return bDate - aDate;
                      })
                      .map((entry) => {
                        return (
                          <div
                            className='details-display-item'
                            key={entry._id}
                            style={{
                              color:
                                entry.type === 'income'
                                  ? 'rgb(33, 105, 33)'
                                  : 'rgb(136, 30, 30)',
                            }}
                          >
                            <div className='item-details'>
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
                                  {actionBtnClicked &&
                                    `${entry._id}` === `${itemId}` && (
                                      <div className='actions__menu'>
                                        <ul>
                                          <li
                                            onClick={() =>
                                              handleEditClick(entry._id)
                                            }
                                          >
                                            Edit
                                          </li>
                                          <li
                                            onClick={() =>
                                              handleDeleteClick(entry._id)
                                            }
                                          >
                                            Delete
                                          </li>
                                        </ul>
                                      </div>
                                    )}
                                </div>
                              </div>
                            </div>
                            <div className='item__date'>
                              {format(
                                new Date(entry.createdAt),
                                'EEEE, MMMM do, yyyy'
                              )}
                            </div>
                            {/* {entry.createdAt !== entry.updatedAt && (
                              <div className='item__date'>
                                <strong>Edited at:</strong>{' '}
                                {format(
                                  new Date(entry.updatedAt),
                                  'EEEE, MMMM do, yyyy, HH:mm:ss'
                                )}
                              </div>
                            )} */}
                          </div>
                        );
                      })}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default DetailsDisplayItem;
