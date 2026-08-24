import { combineReducers } from '@reduxjs/toolkit';
import bookingReducer from "../business/reducers/bookingReducer"
import managementReducer from "../business/reducers/managementReducer"
const busenessReducer = combineReducers({
  booking:bookingReducer,
  management:managementReducer,
});
  
export default busenessReducer;