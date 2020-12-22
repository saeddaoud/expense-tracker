import axios from 'axios';

import {
  ADD_ENRTY_FAIL,
  ADD_ENRTY_REQUEST,
  ADD_ENRTY_SUCCESS,
  DELETE_ENTRY,
  EDIT_ENTRY,
  FETCH_ENTRY,
  FILTER_BY_YEAR,
  SET_YEAR,
} from '../constants.js/transactionConstants';

export const addEntry = (entry) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_ENRTY_REQUEST });

    const token = `Bearer ${
      getState().userRegister.userInfo.token ||
      getState().userLogin.userInfo.token
    }`;

    const config = {
      headers: {
        'Type-Content': 'application/json',
        Authorization: token,
      },
    };

    const { data } = await axios.post('/api/v1/transactions', entry, config);

    dispatch({
      type: ADD_ENRTY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_ENRTY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
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
