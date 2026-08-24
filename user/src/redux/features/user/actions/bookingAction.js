import { API_REQUEST } from "../..";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  bhksAPI,
  amentiesAPI,
  bedBathsAPI,
  webPropertiesAPI,
  bookPropertyAPI,
  userBookingsAPI,
  payBookingAPI,
  userRecentBookingsAPI,
  userMyBookingsAPI,
  addRatingAPI,
  bookInformationAPI,
  cancelBookingAPI,
  addToWishlistAPI,
  wishlistAPI,
  subscriptionAPI,
  guestDashboardDataEndPointURL,
  propertyDetailAPI,
  reviewsAPI,
  reportThePropertyAPI,
  createUserInquiryAPI,
  userUploadBookingDocumentAPI,
  guestSingleBookingAPI,
} from "../../../../shared/routes/apiURLs";

// fetch-properties
export const fetchProperties = createAsyncThunk(
  "fetch-properties",
  async (props) => {
    try {
      const { payload } = props || {};
      const response = await API_REQUEST({
        url: webPropertiesAPI,
        method: "GET",
        params: payload || {},
        panel: "guest",
      });
      return response;
    } catch (error) {}
  },
);
// fetch-reviews
export const fetchReviews = createAsyncThunk(
  "fetch-reviews",
  async (props) => {
    try {
      const { payload } = props || {};
      const response = await API_REQUEST({
        url: reviewsAPI,
        method: "GET",
        params: payload || {},
        panel: "guest",
      });
      return response;
    } catch (error) {}
  },
);
// fetch-property-detail
export const fetchPropertyDetail = createAsyncThunk(
  "fetch-property-detail",
  async (props) => {
    try {
      const response = await API_REQUEST({
        url: propertyDetailAPI + props,
        method: "GET",
        panel: "guest",
      });
      return response;
    } catch (error) {}
  },
);

// fetch-amenties
export const fetchAmenties = createAsyncThunk("fetch-amenties", async () => {
  try {
    const response = await API_REQUEST({
      url: amentiesAPI,
      method: "GET",
      panel: "guest",
    });
    return response;
  } catch (error) {}
});

// fetch-bhk
export const fetchBhks = createAsyncThunk("fetch-bhk", async () => {
  try {
    const response = await API_REQUEST({
      url: bhksAPI,
      method: "GET",
      panel: "guest",
    });
    return response;
  } catch (error) {}
});

// fetch-bed-bath
export const fetchbedBaths = createAsyncThunk("fetch-bed-bath", async () => {
  try {
    const response = await API_REQUEST({
      url: bedBathsAPI,
      method: "GET",
      panel: "guest",
    });
    return response;
  } catch (error) {}
});

// get-booking-information
export const fetchBookInformation = createAsyncThunk(
  "get-booking-information",
  async (props) => {
    try {
      const { payload, loggedInRole } = props;
      const response = await API_REQUEST({
        url: bookInformationAPI,
        method: "GET",
        panel: "guest",
        params: payload,
        loggedInRole,
      });
      return response;
    } catch (error) {}
  },
);

// manage-book-property
export const manageBookProperty = createAsyncThunk(
  "manage-book-property",
  async (props) => {
    try {
      const { payload, loggedInRole, callback } = props;
      const response = await API_REQUEST({
        url: bookPropertyAPI,
        method: "POST",
        panel: "guest",
        data: payload,
        loggedInRole,
      });
      callback(response);
      return response;
    } catch (error) {}
  },
);

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
    } catch (error) {}
  },
);

// fetch-recent-bookings
export const fetchUserRecentBookings = createAsyncThunk(
  "fetch-recent-bookings",
  async () => {
    try {
      const response = await API_REQUEST({
        url: userRecentBookingsAPI,
        method: "GET",
        panel: "guest",
      });
      return response;
    } catch (error) {}
  },
);

// fetch-user-dashboard-data
export const fetchUserDashboardData = createAsyncThunk("fetch-user-dashboard-data", async () => {
  try {
    const response = await API_REQUEST({
      url: guestDashboardDataEndPointURL,
      method: "GET",
      panel: "guest",
    });
    return response;
  } catch (error) { }
});

// fetch-my-bookings
export const fetchMyBookings = createAsyncThunk(
  "fetch-my-bookings",
  async () => {
    try {
      const response = await API_REQUEST({
        url: userMyBookingsAPI,
        method: "GET",
        panel: "guest",
      });
      return response;
    } catch (error) {}
  },
);

// add-rating
export const addRating = createAsyncThunk("add-rating", async (props) => {
  try {
    const { payload, callback } = props;
    const response = await API_REQUEST({
      url: addRatingAPI,
      method: "POST",
      panel: "guest",
      data: payload,
    });
    callback(response);
    return response;
  } catch (error) {}
});
// canceled-booking
export const canceledBooking = createAsyncThunk(
  "canceled-booking",
  async (props) => {
    try {
      const { payload, callback } = props;
      const response = await API_REQUEST({
        url: cancelBookingAPI,
        method: "POST",
        panel: "guest",
        data: payload,
      });
      callback(response);
      return response;
    } catch (error) {}
  },
);

// add-to-wishlist
export const addToWishlist = createAsyncThunk(
  "add-to-wishlist",
  async (props) => {
    try {
      const { payload, callback } = props;
      const response = await API_REQUEST({
        url: addToWishlistAPI,
        method: "POST",
        panel: "guest",
        data: payload,
      });
      callback(response);
      return response;
    } catch (error) {}
  },
);

// get-my-wishlist
export const fetchMyWishlist = createAsyncThunk("get-my-wishlist", async () => {
  try {
    const response = await API_REQUEST({
      url: wishlistAPI,
      method: "GET",
      panel: "guest",
    });
    return response;
  } catch (error) {}
});
// get-subscription
export const fetchSubscription = createAsyncThunk(
  "get-subscription",
  async () => {
    try {
      const response = await API_REQUEST({
        url: subscriptionAPI,
        method: "GET",
        panel: "guest",
      });
      return response;
    } catch (error) {}
  },
);

// report-the-property
export const reportTheProperty = createAsyncThunk("report-the-property", async (props) => {
  try {
    const { payload, callback } = props;
    const response = await API_REQUEST({
      url: reportThePropertyAPI,
      method: "POST",
      panel: "guest",
      data: payload,
    });
    callback(response);
    return response;
  } catch (error) {}
});
// create-user-inquiry
export const createUserInquiry = createAsyncThunk(
  "create-user-inquiry",
  async (props) => {
    try {
      const { payload, callback } = props;
      const response = await API_REQUEST({
        url: createUserInquiryAPI,
        method: "POST",
        // panel: "guest",
        data: payload,
      });
      callback?.(response);
      return response;
    } catch (error) {}
  },
);

// upload-booking-documents
export const uploadBookingDocuments = createAsyncThunk(
  "upload-booking-documents",
  async (props) => {
    try {
      const { booking_id, payload, callback } = props;
      const response = await API_REQUEST({
        url: userUploadBookingDocumentAPI + booking_id,
        method: "POST",
        data: payload,
        panel: "guest",
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      callback(response);
      return response;
    } catch (error) {}
  },
);

// fetch-single-booking
export const fetchSingleBooking = createAsyncThunk(
  "fetch-single-booking",
  async (props) => {
    try {
      const { payload } = props;
      const response = await API_REQUEST({
        url: guestSingleBookingAPI + payload,
        method: "GET",
        panel: "guest",
      });
      return response;
    } catch (error) {}
  },
);
