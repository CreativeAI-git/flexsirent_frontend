import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_REQUEST } from "../..";
import {
  userBookingsAPI,
  createNewSupportAPI,
  userSupportAPI,
  payhistoryAPI,
  payhistoryDetailsAPI,
  userReportsAPI,
  userInquiriesAPI,
} from "../../../../shared/routes/apiURLs";

// fetch-bookings
export const fetchUserBookings = createAsyncThunk(
  "fetch-bookings",
  async () => {
    try {
      const response = await API_REQUEST({
        url: userBookingsAPI,
        method: "GET",
        panel: "guest",
      });
      return response;
    } catch (error) {}
  },
);

// new-support
export const createNewSupport = createAsyncThunk(
  "new-support",
  async (props) => {
    try {
      const { payload, callback } = props;
      const response = await API_REQUEST({
        url: createNewSupportAPI,
        method: "POST",
        panel: "guest",
        data: payload,
      });
      callback(response);
      return response;
    } catch (error) {}
  },
);

// fetch-user-support
export const fetchUserSupport = createAsyncThunk(
  "fetch-user-support",
  async () => {
    try {
      const response = await API_REQUEST({
        url: userSupportAPI,
        method: "GET",
        panel: "guest",
      });
      return response;
    } catch (error) {}
  },
);

// fetch-pay-history
export const fetchPayHistory = createAsyncThunk(
  "fetch-pay-history",
  async () => {
    try {
      const response = await API_REQUEST({
        url: payhistoryAPI,
        method: "GET",
        panel: "guest",
      });
      return response;
    } catch (error) {}
  },
);

// fetch-pay-history-details
export const fetchPayHistoryDetails = createAsyncThunk(
  "fetch-pay-history-details",
  async (props) => {
    try {
      const response = await API_REQUEST({
        url: payhistoryDetailsAPI + props,
        method: "GET",
        panel: "guest",
      });
      return response;
    } catch (error) {}
  },
);

// fetch-reports
export const fetchReports = createAsyncThunk("fetch-reports", async () => {
  try {
    const response = await API_REQUEST({
      url: userReportsAPI,
      method: "GET",
    });
    return response;
  } catch (error) {}
});

// fetch-user-inquiries
export const fetchUserInquiries = createAsyncThunk(
  "fetch-user-inquiries",
  async () => {
    try {
      const response = await API_REQUEST({
        url: userInquiriesAPI,
        method: "GET",
        panel: "guest",
         isErrorToast:false,
      });
      return response;
    } catch (error) {}
  },
);
