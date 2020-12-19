import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { entriesListReducer } from './reducers/entriesReducers';
import { userLoginReducer } from './reducers/userReducers';

const initialState = {};

const middleware = [thunk];

const reducer = combineReducers({
  userLogin: userLoginReducer,
  entriesList: entriesListReducer,
});

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
