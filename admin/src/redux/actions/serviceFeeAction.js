import { API_REQUEST } from ".";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createServiceFeeAPI,
  deleteReviewAPI,
  deleteSeriveFeeAPI,
  inquiriesAPI,
  offersAPI,
  payoutAPI,
  payoutCardDataAPI,
  PropertyForReviewAPI,
  reportsAPI,
  reviewsAPI,
  serviceFeeAPI,
  updateReviewsAPI,
  updateServiceFeeAPI,
} from "../../routes/BackendRouts";

// fetch-service-fee
export const fetchServiceFee = createAsyncThunk(
  "fetch-service-fee",
  async () => {
    try {
      const response = await API_REQUEST({
        url: serviceFeeAPI,
        method: "GET",
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// delete-service-fee
export const deleteSeriveFee = createAsyncThunk(
  "delete-service-fee",
  async (props) => {
    try {
      const { payload, callback } = props;
      const response = await API_REQUEST({
        url: deleteSeriveFeeAPI + payload,
        method: "DELETE",
      });
      callback(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// create-service-fee
export const createServiceFee = createAsyncThunk(
  "create-service-fee",
  async (props) => {
    try {
      const { payload, callback } = props;
      const response = await API_REQUEST({
        url: createServiceFeeAPI,
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

// update-service-fee
export const updateServiceFee = createAsyncThunk(
  "update-service-fee",
  async (props) => {
    try {
      const { payload, callback } = props;
      const { id, ...other } = payload;
      const response = await API_REQUEST({
        url: updateServiceFeeAPI + id,
        method: "PATCH",
        data: other,
      });
      callback(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// fetch-reviews
export const fetchReviews = createAsyncThunk(
  "fetch-reviews",
  async () => {
    try {
      const response = await API_REQUEST({
        url: reviewsAPI,
        method: "GET",
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
// fetch-property-for-review
export const fetchPropertyForReview = createAsyncThunk(
  "fetch-property-for-review",
  async () => {
    try {
      const response = await API_REQUEST({
        url: PropertyForReviewAPI,
        method: "GET",
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// delete-review
export const deleteReview = createAsyncThunk(
  "delete-review",
  async (props) => {
    try {
      const { payload, callback } = props;
      const response = await API_REQUEST({
        url: deleteReviewAPI + payload,
        method: "DELETE",
      });
      callback(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// create-review
export const createReview = createAsyncThunk(
  "create-review",
  async (props) => {
    try {
      const { payload, callback } = props;
      const response = await API_REQUEST({
        url: reviewsAPI,
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
// update-review
export const updateReview = createAsyncThunk(
  "update-review",
  async (props) => {
    try {
      const { payload, callback } = props;
      const response = await API_REQUEST({
        url: updateReviewsAPI,
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

// fetch-reports
export const fetchReports = createAsyncThunk(
  "fetch-reports",
  async () => {
    try {
      const response = await API_REQUEST({
        url: reportsAPI,
        method: "GET",
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// fetch-payout
export const fetchPayout = createAsyncThunk(
  "fetch-payout",
  async () => {
    try {
      const response = await API_REQUEST({
        url: payoutAPI,
        method: "GET",
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
// fetch-payout-card-data
export const fetchPayoutCardData = createAsyncThunk(
  "fetch-payout-card-data",
  async () => {
    try {
      const response = await API_REQUEST({
        url: payoutCardDataAPI,
        method: "GET",
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// fetch-inquiries
export const fetchInquiries = createAsyncThunk(
  "fetch-inquiries",
  async () => {
    try {
      const response = await API_REQUEST({
        url: inquiriesAPI,
        method: "GET",
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// fetch-offers
export const fetchOffers = createAsyncThunk("fetch-offers", async () => {
  try {
    const response = await API_REQUEST({
      url: offersAPI,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
});
