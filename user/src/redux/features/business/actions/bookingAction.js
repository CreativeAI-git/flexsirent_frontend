import { API_REQUEST } from "../..";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  payBookingAPI,
  gerGuestPaymentAPI,
  guestBusinessBookingsAPI,
  gustBusinessDashboardAPI,
  guestBusinessBookingByIdAPI,
  guestBusinessDashboardDataEndPointURL,
} from "../../../../shared/routes/apiURLs";

// fetch-dashboard
export const fetchDashboard = createAsyncThunk("fetch-dashboard", async () => {
  try {
    const response = await API_REQUEST({
      url: gustBusinessDashboardAPI,
      method: "GET",
      panel: "host",
    });
    return response;
  } catch (error) { }
});

// fetch-bookings
export const fetchBookings = createAsyncThunk("fetch-bookings", async () => {
  try {
    const response = await API_REQUEST({
      url: guestBusinessBookingsAPI,
      method: "GET",
      panel: "host",
    });
    return response;
  } catch (error) { }
});

// fetch-booking-detail-by-id
export const fetchBookinDetailgById = createAsyncThunk(
  "fetch-booking-detail-by-id",
  async (props) => {
    try {
      const { payload } = props;
      const response = await API_REQUEST({
        url: guestBusinessBookingByIdAPI + payload,
        method: "GET",
        panel: "host",
      });
      return response;
    } catch (error) { }
  }
);

// pay-for-booking
export const payForBooking = createAsyncThunk(
  "pay-for-booking",
  async (props) => {
    try {
      const { payload, callback } = props;
      const response = await API_REQUEST({
        url: payBookingAPI,
        method: "POST",
        panel: "guest",
        isSuccessToast: false,
        data: payload,

      });
      callback(response);
      return response;
    } catch (error) { }
  }
);

// fetch-payments
export const fetchPayments = createAsyncThunk("fetch-payments", async () => {
  try {
    const response = await API_REQUEST({
      url: gerGuestPaymentAPI,
      method: "GET",
      panel: "host",
    });
    return response;
  } catch (error) { }
});

// guestOrBusinessPay
export const guestOrBusinessPay = createAsyncThunk(
  "guestOrBusinessPay",
  async (props) => {
    try {
      const { payload, url } = props;
      const response = await API_REQUEST({
        url: url,
        method: "GET",
        panel: "host",
        params: payload,
        isSuccessToast: false,
      });
      return response;
    } catch (error) { }
  }
);
