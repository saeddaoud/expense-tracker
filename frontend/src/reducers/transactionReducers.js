import {
  EDIT_ENTRY,
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
  DELETE_ENRTY_REQUEST,
  DELETE_ENRTY_SUCCESS,
  DELETE_ENRTY_FAIL,
  EDIT_ENRTY_REQUEST,
  EDIT_ENRTY_SUCCESS,
  EDIT_ENRTY_FAIL,
  EDIT_ENRTY_RESET,
  ENTRIES_LIST_RESET,
  ENTRIES_FILTERED_LIST_RESET,
  ENTRIES_FILTERED_LIST_FAIL,
  ENTRIES_FILTERED_LIST_SUCCESS,
  ENTRIES_FILTERED_LIST_REQUEST,
} from '../constants.js/transactionConstants';

export const transactionsListReducer = (
  state = { entries: [], year: 'Year' },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case ENTRIES_LIST_REQUEST:
      return { ...state, loading: true };
    case ENTRIES_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        success: true,
        entries: payload.entries,
        year: payload.year,
      };
    case ENTRIES_LIST_FAIL:
      return { ...state, loading: false, error: payload };
    case ENTRIES_LIST_RESET:
      return { entries: [], year: 'Year' };
    default:
      return state;
  }
};

// export const transactionsFilteredListReducer = (state = {}, action) => {
//   const { type, payload } = action;
//   switch (type) {
//     case ENTRIES_FILTERED_LIST_REQUEST:
//       return { loading: true };
//     case ENTRIES_FILTERED_LIST_SUCCESS:
//       return { loading: false, success: true, filtered: payload };
//     case ENTRIES_FILTERED_LIST_FAIL:
//       return { loading: false, error: payload };
//     case ENTRIES_FILTERED_LIST_RESET:
//       return {};
//     default:
//       return state;
//   }
// };

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

export const transactionEditReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case EDIT_ENRTY_REQUEST:
      return { loading: true };
    case EDIT_ENRTY_SUCCESS:
      return { loading: false, success: true };
    case EDIT_ENRTY_FAIL:
      return { loading: false, error: payload };
    case EDIT_ENRTY_RESET:
      return {};
    default:
      return state;
  }
};

export const transactionDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case DELETE_ENRTY_REQUEST:
      return { loading: true };
    case DELETE_ENRTY_SUCCESS:
      return { loading: false, success: true };
    case DELETE_ENRTY_FAIL:
      return { loading: false, error: payload };
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
    // case FETCH_ENTRY:
    //   return {
    //     ...state,
    //     entry: state.entries.find((el) => el.id === payload),
    //   };
    case EDIT_ENTRY:
      return {
        ...state,
        entries: state.entries.map((el) =>
          el.id === payload.id ? payload : el
        ),
      };
    // case DELETE_ENTRY:
    //   return {
    //     ...state,
    //     entries: state.entries.filter((el) => el.id !== payload),
    //   };
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
    // case RESET_ENTRY:
    //   return { ...state, entry: null, filtered: [] };
    default:
      return state;
  }
};
