import {
  DELETE_ENTRY,
  EDIT_ENTRY,
  FETCH_ENTRY,
  RESET_ENTRY,
  FILTER_BY_YEAR,
  SET_YEAR,
  ADD_ENRTY_REQUEST,
  ADD_ENRTY_SUCCESS,
  ADD_ENRTY_FAIL,
  ENTRIES_LIST_REQUEST,
  ENTRIES_LIST_SUCCESS,
  ENTRIES_LIST_FAIL,
  FETCH_ENRTY_FAIL,
  FETCH_ENRTY_SUCCESS,
  FETCH_ENRTY_REQUEST,
  FETCH_ENRTY_RESET,
} from '../constants.js/transactionConstants';

export const transactionsListReducer = (state = { entries: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case ENTRIES_LIST_REQUEST:
      return { ...state, loading: true };
    case ENTRIES_LIST_SUCCESS:
      return { ...state, loading: false, success: true, entries: payload };
    case ENTRIES_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    default:
      return state;
  }
};

export const transactionAddReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_ENRTY_REQUEST:
      return { loading: true };
    case ADD_ENRTY_SUCCESS:
      return { loading: false, success: true, entry: payload };
    case ADD_ENRTY_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const transactionFetchReducer = (state = { entry: null }, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_ENRTY_REQUEST:
      return { ...state, loading: true };
    case FETCH_ENRTY_SUCCESS:
      return { ...state, loading: false, success: true, entry: payload };
    case FETCH_ENRTY_FAIL:
      return { ...state, loading: false, error: payload };
    case FETCH_ENRTY_RESET:
      return { entry: null };
    default:
      return state;
  }
};

export const entriesListReducer = (
  state = { entries: [], entry: null, filtered: [], year: 'Year' },
  action
) => {
  const { payload, type } = action;
  switch (type) {
    // case ADD_ENTRY:
    //   return { ...state, entries: [payload, ...state.entries] };
    case FETCH_ENTRY:
      return {
        ...state,
        entry: state.entries.find((el) => el.id === payload),
      };
    case EDIT_ENTRY:
      return {
        ...state,
        entries: state.entries.map((el) =>
          el.id === payload.id ? payload : el
        ),
      };
    case DELETE_ENTRY:
      return {
        ...state,
        entries: state.entries.filter((el) => el.id !== payload),
      };
    case FILTER_BY_YEAR:
      return {
        ...state,
        filtered: state.entries.filter((el) => el.year === payload),
        year: payload,
      };
    case SET_YEAR:
      return {
        ...state,
        year: payload,
      };
    case RESET_ENTRY:
      return { ...state, entry: null, filtered: [] };
    default:
      return state;
  }
};
