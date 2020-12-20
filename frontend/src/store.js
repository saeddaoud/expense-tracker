import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { entriesListReducer } from './reducers/entriesReducers';
import { userLoginReducer } from './reducers/userReducers';

const middleware = [thunk];

const reducer = combineReducers({
  userLogin: userLoginReducer,
  entriesList: entriesListReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : {};

const initialState = {
  userLogin: userInfoFromStorage,
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
