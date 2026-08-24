import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_REQUEST } from ".";
import { addBusinessAPI, addUserAPI, businessAPI, businessStatusUpdateAPI, businessUsersAPI, UserBookingsAPI ,usersAPI} from "../../routes/BackendRouts";

// fetch-users
export const fetchUsers = createAsyncThunk("fetch-users", async (props) => {
  try {
    const response = await API_REQUEST({
      url: usersAPI,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
});
// business
export const fetchBusiness = createAsyncThunk("business", async (props) => {
  try {
    const response = await API_REQUEST({
      url: businessAPI,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
});

// business-status-update
export const businessStatusUpdate = createAsyncThunk(
  "business-status-update",
  async (props) => {
    try {
      const { payload, callback } = props;
      const response = await API_REQUEST({
        url: businessStatusUpdateAPI,
        method: "POST",
        data: payload,
      });
      callback(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// business-users
export const fetchBusinessUsers = createAsyncThunk(
  "business-users",
  async (props) => {
    try {
      const { payload } = props;
      const response = await API_REQUEST({
        url:businessUsersAPI,
        method: "GET",
        params: payload,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// users-booked-properties
export const fetchUsersBookedProperties = createAsyncThunk(
  "users-booked-properties",
  async (props) => {
    try {
      const { payload } = props;
      const response = await API_REQUEST({
        url:UserBookingsAPI,
        method: "GET",
        params: payload,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// add-user
export const addUser = createAsyncThunk(
  "add-user",
  async (props) => {
    try {
      const { payload, callback } = props;
      const response = await API_REQUEST({
        url: addUserAPI,
        method: "POST",
        data: payload,
      });
      callback(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
// add-business
export const addBusiness = createAsyncThunk(
  "add-business",
  async (props) => {
    try {
      const { payload, callback } = props;
      const response = await API_REQUEST({
        url: addBusinessAPI,
        method: "POST",
        data: payload,
      });
      callback(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);