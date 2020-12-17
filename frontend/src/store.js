import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { entriesListReducer } from './reducers/entriesReducers';

const initialState = {};

const middleware = [thunk];

const reducer = combineReducers({
  entriesList: entriesListReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
