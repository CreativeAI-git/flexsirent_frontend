import { combineReducers } from '@reduxjs/toolkit';
import authReducer from "../host/reducers/authReducer";
import bookingReducer from "../host/reducers/bookingReducer";
import reviewReducer from "../host/reducers/reviewReducer";
import inboxReducer from "../host/reducers/inboxReducer";

const hostReducer = combineReducers({
  auth: authReducer,
  booking: bookingReducer,
  review: reviewReducer,
  inbox: inboxReducer
});

export default hostReducer;