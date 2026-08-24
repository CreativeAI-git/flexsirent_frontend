import { API_REQUEST } from "../..";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  amentiesAPI,
  createNewPropertyAPI,
  deletePropertyAPI,
  editNewPropertyAPI,
  hostBookingDetailAPI,
  hostBookingsAPI,
  houseRulesAPI,
  hostUpdateBookingStatusAPI,
  idialsAPI,
  listingForYouAPI,
  propertiesAPI,
  propertyTypesAPI,
  saftyMentiesAPI,
  cliningManageAPI,
  updateCleaningStatusAPI,
  checkoutsAPI,
  makeCheckoutAPI,
  hostDashboardDataEndPointURL,
  hostReviewsAPI,
  hostRequestDocumentAPI,
} from "../../../../shared/routes/apiURLs";

// fetch-propertie
export const fetchProperties = createAsyncThunk(
  "fetch-properties",
  async () => {
    try {
      const response = await API_REQUEST({
        url: propertiesAPI,
        method: "GET",
        panel: "host",
      });
      return response;
    } catch (error) { }
  }
);
// fetch-property-types
export const fetchPropertyTypes = createAsyncThunk(
  "fetch-property-types",
  async () => {
    try {
      const response = await API_REQUEST({
        url: propertyTypesAPI,
        method: "GET",
        panel: "host",
      });
      return response;
    } catch (error) { }
  }
);
// fetch-amenties
export const fetchAmenties = createAsyncThunk("fetch-amenties", async () => {
  try {
    const response = await API_REQUEST({
      url: amentiesAPI,
      method: "GET",
      panel: "host",
    });
    return response;
  } catch (error) { }
});
// fetch-safty-amenties
export const fetchSaftyAmenties = createAsyncThunk(
  "fetch-safty-amenties",
  async () => {
    try {
      const response = await API_REQUEST({
        url: saftyMentiesAPI,
        method: "GET",
        panel: "host",
      });
      return response;
    } catch (error) { }
  }
);
// fetch-ideals
export const fetchIdeals = createAsyncThunk("fetch-ideals", async () => {
  try {
    const response = await API_REQUEST({
      url: idialsAPI,
      method: "GET",
      panel: "host",
    });
    return response;
  } catch (error) { }
});

// fetch-house-rules
export const fetchHouseRules = createAsyncThunk(
  "fetch-house-rules",
  async () => {
    try {
      const response = await API_REQUEST({
        url: houseRulesAPI,
        method: "GET",
        panel: "host",
      });
      return response;
    } catch (error) { }
  }
);
// create-new-property
export const createNewProperty = createAsyncThunk(
  "create-new-property",
  async (props) => {
    const { callback, payload } = props || {};
    try {
      const response = await API_REQUEST({
        url: createNewPropertyAPI,
        method: "POST",
        data: payload,
        panel: "host",
      });
      callback(response);
      return response;
    } catch (error) { }
  }
);
// delete-property
export const deleteProperty = createAsyncThunk(
  "delete-property",
  async (props) => {
    const { callback, payload } = props || {};
    try {
      const response = await API_REQUEST({
        url: deletePropertyAPI,
        method: "POST",
        data: payload,
        panel: "host",
      });
      callback(response);
      return response;
    } catch (error) { }
  }
);
// listing-for-you
export const listingForYou = createAsyncThunk(
  "listing-for-you",
  async (props) => {
    const { callback, payload } = props || {};
    try {
      const response = await API_REQUEST({
        url: listingForYouAPI,
        method: "POST",
        data: payload,
        panel: "host",
      });
      callback(response);
      return response;
    } catch (error) { }
  }
);

// edit-new-property
export const editNewProperty = createAsyncThunk(
  "edit-new-property",
  async (props) => {
    const { callback, payload } = props || {};
    try {
      const response = await API_REQUEST({
        url: editNewPropertyAPI,
        method: "POST",
        data: payload,
        panel: "host",
      });
      callback(response);
      return response;
    } catch (error) { }
  }
);

// fetch-bookings
export const fetchBookings = createAsyncThunk(
  "fetch-bookings",
  async () => {
    try {
      const response = await API_REQUEST({
        url: hostBookingsAPI,
        method: "GET",
        panel: "host",
      });
      return response;
    } catch (error) { }
  }
);

// fetch-host-dashboard-data
export const fetchHostDashboardData = createAsyncThunk(
  "fetch-host-dashboard-data",
  async () => {
    try {
      const response = await API_REQUEST({
        url: hostDashboardDataEndPointURL,
        method: "GET",
        panel: "host",
      });
      return response;
    } catch (error) { }
  }
);

// fetch-booking-detail-by-id
export const fetchBookingById = createAsyncThunk(
  "fetch-booking-detail-by-id",
  async (props) => {
    try {
      const { payload } = props
      const response = await API_REQUEST({
        url: hostBookingDetailAPI + payload,
        method: "GET",
        panel: "host",
      });
      return response;
    } catch (error) { }
  }
);

// update-booking-status
export const updateBookingStatus = createAsyncThunk(
  "update-booking-status",
  async (props) => {
    try {
      const { payload, callback } = props
      const response = await API_REQUEST({
        url: hostUpdateBookingStatusAPI,
        method: "POST",
        data: payload,
        panel: "host",
      });
      callback(response)
      return response;
    } catch (error) { }
  }
);

// request-booking-documents
export const requestBookingDocuments = createAsyncThunk(
  "request-booking-documents",
  async (props) => {
    try {
      const { payload, callback } = props
      const response = await API_REQUEST({
        url: hostRequestDocumentAPI,
        method: "POST",
        data: payload,
        panel: "host",
      });
      callback(response)
      return response;
    } catch (error) { }
  }
);

// fetch-checkouts
export const fetchCheckouts = createAsyncThunk(
  "fetch-checkouts",
  async () => {
    try {
      const response = await API_REQUEST({
        url: checkoutsAPI,
        method: "GET",
        panel: "host",
      });
      return response;
    } catch (error) { }
  }
);

// fetch-cleaning-manage
export const fetchCliningManage = createAsyncThunk(
  "fetch-cleaning-manage",
  async () => {
    try {
      const response = await API_REQUEST({
        url: cliningManageAPI,
        method: "GET",
        panel: "host",
      });
      return response;
    } catch (error) { }
  }
);

// update-cleaning-status
export const updateCleaningStatus = createAsyncThunk(
  "update-cleaning-status",
  async (props) => {
    try {
      const { payload, callback } = props
      const response = await API_REQUEST({
        url: updateCleaningStatusAPI,
        method: "POST",
        data: payload,
        panel: "host",
      });
      callback(response)
      return response;
    } catch (error) { }
  }
);
// make-checkout
export const makeCheckout = createAsyncThunk(
  "make-checkout",
  async (props) => {
    try {
      const { payload, callback } = props
      const response = await API_REQUEST({
        url: makeCheckoutAPI + payload,
        method: "POST",
        panel: "host",
      });
      callback(response)
      return response;
    } catch (error) { }
  }
);

// fetch-host-reviews
export const fetchHostReviews = createAsyncThunk(
  "fetch-host-reviews",
  async (props) => {
    try {
      const { payload } = props || {};
      const response = await API_REQUEST({
        url: hostReviewsAPI,
        method: "GET",
        panel: "host",
        params: payload,
      });
      return response;
    } catch (error) { }
  }
);
