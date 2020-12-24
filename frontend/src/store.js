import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {
  entriesListReducer,
  transactionAddReducer,
  transactionDeleteReducer,
  transactionFetchReducer,
  transactionsListReducer,
} from './reducers/transactionReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';

const middleware = [thunk];

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  entriesList: entriesListReducer,
  transactionAdd: transactionAddReducer,
  transactionFetch: transactionFetchReducer,
  transactionDelete: transactionDeleteReducer,
  transactionsList: transactionsListReducer,
});

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
