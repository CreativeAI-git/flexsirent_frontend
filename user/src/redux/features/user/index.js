import { combineReducers } from '@reduxjs/toolkit';
import authReducer from "../user/reducers/authReducer"
import inboxReducer from "../user/reducers/inboxReducer"
import bookingReducer from "../user/reducers/bookingReducer"
const guestReducer = combineReducers({
  auth: authReducer,
  inbox: inboxReducer,
  booking:bookingReducer
});

export default guestReducer;
