import { API_REQUEST } from "../..";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  hostPropertyInquiriesAPI,
  hostQueriesAPI,
  hostReportsAPI,
  sendQueryAPI,
  sendReplyAPI,
  userQueriesAPI,
} from "../../../../shared/routes/apiURLs";

// fetch-user-queries
export const fetchUserQueries = createAsyncThunk("fetch-user-queries", async () => {
  try {
    const response = await API_REQUEST({
      url: userQueriesAPI,
      method: "GET",
    });
    return response;
  } catch (error) { }
});
// fetch-host-queries
export const fetchHostQueries = createAsyncThunk("fetch-host-queries", async () => {
  try {
    const response = await API_REQUEST({
      url: hostQueriesAPI,
      method: "GET",
    });
    return response;
  } catch (error) { }
});

// send-query
export const sendQuery = createAsyncThunk("send-query", async (props) => {
  try {
    const {payload,callback} = props
    const response = await API_REQUEST({
      url: sendQueryAPI,
      method: "POST",
      data:payload,
    });
    callback(response)
    return response;
  } catch (error) { }
});
// send-reply
export const sendReply = createAsyncThunk("send-reply", async (props) => {
  try {
    const {payload,callback} = props
    const response = await API_REQUEST({
      url: sendReplyAPI,
      method: "POST",
      data:payload,
    });
    callback(response)
    return response;
  } catch (error) { }
});

// fetch-reports
export const fetchReports = createAsyncThunk("fetch-reports", async () => {
  try {
    const response = await API_REQUEST({
      url: hostReportsAPI,
      method: "GET",
    });
    return response;
  } catch (error) { }
});

// fetch-property-inquiries
export const fetchPropertyInquiries = createAsyncThunk(
  "fetch-property-inquiries",
  async () => {
    try {
      const response = await API_REQUEST({
        url: hostPropertyInquiriesAPI,
        method: "GET",
        isErrorToast:false,
      });
      return response;
    } catch (error) {}
  },
);
