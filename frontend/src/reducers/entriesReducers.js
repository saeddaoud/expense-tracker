import {
  ADD_ENTRY,
  DELETE_ENTRY,
  EDIT_ENTRY,
  FETCH_ENTRY,
  RESET_ENTRY,
  FILTER_BY_YEAR,
  SET_YEAR,
} from '../constants.js/entriesConstants';

export const entriesListReducer = (
  state = { entries: [], entry: null, filtered: [], year: 'Year' },
  action
) => {
  const { payload, type } = action;
  switch (type) {
    case ADD_ENTRY:
      return { ...state, entries: [payload, ...state.entries] };
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
