import axios from 'axios';

import {
  ADD_ENRTY_FAIL,
  ADD_ENRTY_REQUEST,
  ADD_ENRTY_SUCCESS,
  DELETE_ENRTY_FAIL,
  DELETE_ENRTY_REQUEST,
  DELETE_ENRTY_SUCCESS,
  EDIT_ENRTY_FAIL,
  EDIT_ENRTY_REQUEST,
  EDIT_ENRTY_SUCCESS,
  EDIT_ENTRY,
  ENTRIES_LIST_FAIL,
  ENTRIES_LIST_REQUEST,
  ENTRIES_LIST_SUCCESS,
  FETCH_ENRTY_FAIL,
  FETCH_ENRTY_REQUEST,
  FETCH_ENRTY_SUCCESS,
  FILTER_BY_YEAR,
  SET_YEAR,
} from '../constants.js/transactionConstants';

export const listEntries = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ENTRIES_LIST_REQUEST });

    const token = `Bearer ${getState().userLogin.userInfo.token}`;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    const { data } = await axios.get('/api/v1/transactions', config);

    dispatch({
      type: ENTRIES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ENTRIES_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const addEntry = (entry) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADD_ENRTY_REQUEST });

    const token = `Bearer ${getState().userLogin.userInfo.token}`;

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

export const editEntry = (entry) => async (dispatch, getState) => {
  try {
    dispatch({ type: EDIT_ENRTY_REQUEST });

    const token = `Bearer ${getState().userLogin.userInfo.token}`;

    const config = {
      headers: {
        'Type-Content': 'application/json',
        Authorization: token,
      },
    };

    const { data } = await axios.put(
      `/api/v1/transactions/${entry._id}`,
      entry,
      config
    );

    dispatch({
      type: EDIT_ENRTY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EDIT_ENRTY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const fetchEntry = (entryId) => async (dispatch, getState) => {
  try {
    dispatch({ type: FETCH_ENRTY_REQUEST });

    const token = `Bearer ${getState().userLogin.userInfo.token}`;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    const { data } = await axios.get(`/api/v1/transactions/${entryId}`, config);

    dispatch({
      type: FETCH_ENRTY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_ENRTY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteEntry = (entryId) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_ENRTY_REQUEST });

    const token = `Bearer ${getState().userLogin.userInfo.token}`;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    await axios.delete(`/api/v1/transactions/${entryId}`, config);

    dispatch({
      type: DELETE_ENRTY_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ENRTY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// export const resetFetched = () => (dispatch) => {
//   console.log('reset');
//   dispatch({ type: FETCH_ENRTY_RESET });
// };

// export const fetchEntry = (entryId) => (dispatch) => {
//   dispatch({ type: FETCH_ENTRY, payload: entryId });
// };
// export const editEntry = (entry) => (dispatch) => {
//   dispatch({ type: EDIT_ENTRY, payload: entry });
// };
export const filterEntries = (year) => (dispatch) => {
  dispatch({ type: FILTER_BY_YEAR, payload: year });
};
// export const deleteEntry = (entryId) => (dispatch) => {
//   dispatch({ type: DELETE_ENTRY, payload: entryId });
// };
