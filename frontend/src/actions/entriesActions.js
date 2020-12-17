import {
  ADD_ENTRY,
  DELETE_ENTRY,
  EDIT_ENTRY,
  FETCH_ENTRY,
  FILTER_BY_YEAR,
  SET_YEAR,
} from '../constants.js/entriesConstants';

export const addEntry = (entry) => (dispatch) => {
  dispatch({ type: ADD_ENTRY, payload: entry });
};
export const fetchEntry = (entryId) => (dispatch) => {
  dispatch({ type: FETCH_ENTRY, payload: entryId });
};
export const editEntry = (entry) => (dispatch) => {
  dispatch({ type: EDIT_ENTRY, payload: entry });
};
export const filterEntries = (year) => (dispatch) => {
  dispatch({ type: FILTER_BY_YEAR, payload: year });
};
export const deleteEntry = (entryId) => (dispatch) => {
  dispatch({ type: DELETE_ENTRY, payload: entryId });
};
