import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBhks,
  fetchAmenties,
  fetchbedBaths,
  fetchProperties,
  manageBookProperty,
  fetchUserBookings,
  payForBooking,
  fetchUserRecentBookings,
  fetchMyBookings,
  addRating,
  fetchBookInformation,
  canceledBooking,
  addToWishlist,
  fetchMyWishlist,
  fetchSubscription,
  fetchUserDashboardData,
  fetchPropertyDetail,
  fetchReviews,
  reportTheProperty,
  createUserInquiry,
  fetchSingleBooking,
  uploadBookingDocuments,
} from "../actions/bookingAction";

const initialState = {
  isLoading: false,
  subLoading: false,
  wishListLoading: false,
  reportLoading: false,
  inquiryLoading: false,
  uploadLoading: false,
  propertyList: [],
  reviewList: [],
  wishlistData: [],
  plans: [],
  amenityOptions: [],
  userBookingList: [],
  bookingInfo: {},
  propertyData: {},
  userRecentBookingList: [],
  userMyBookingList: {
    completed: [],
    cancelled: [],
    upcoming: [],
    ongoing: [],
  },
  bedBathObj: null,
  bhkObj: null,
  bookingHeader: [
    "S.No.",
    "Property Title",
    "Host",
    "Booked Date",
    "Booking Status",
    "Payment Status",
    "Action",
  ],
  guestDashboardData: [],
  bookingDetails: {},
};

const bookingSlice = createSlice({
  name: "Booking",
  initialState: initialState,
  extraReducers: (builder) => {
    // fetch-properties
    builder.addCase(fetchProperties.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProperties.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.propertyList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchProperties.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-reviews
    builder.addCase(fetchReviews.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchReviews.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.reviewList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchReviews.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-property-detail
    builder.addCase(fetchPropertyDetail.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPropertyDetail.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.propertyData = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchPropertyDetail.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetch-amenties
    builder.addCase(fetchAmenties.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAmenties.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.amenityOptions = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchAmenties.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-bhk
    builder.addCase(fetchBhks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBhks.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.bhkObj = data || {};
      state.isLoading = false;
    });
    builder.addCase(fetchBhks.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetch-bed-bath
    builder.addCase(fetchbedBaths.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchbedBaths.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.bedBathObj = data || {};
      state.isLoading = false;
    });
    builder.addCase(fetchbedBaths.rejected, (state, action) => {
      state.isLoading = false;
    });
    // manage-book-property
    builder.addCase(manageBookProperty.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(manageBookProperty.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(manageBookProperty.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetch-bookings
    builder.addCase(fetchUserBookings.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserBookings.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.userBookingList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchUserBookings.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-bookings
    builder.addCase(fetchBookInformation.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBookInformation.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.bookingInfo = data || {};
      state.isLoading = false;
    });
    builder.addCase(fetchBookInformation.rejected, (state, action) => {
      state.isLoading = false;
    });
    // pay-for-booking
    builder.addCase(payForBooking.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(payForBooking.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(payForBooking.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetch-recent-bookings
    builder.addCase(fetchUserRecentBookings.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserRecentBookings.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.userRecentBookingList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchUserRecentBookings.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-my-bookings
    builder.addCase(fetchMyBookings.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMyBookings.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.userMyBookingList = data || {
        completed: [],
        cancelled: [],
        upcoming: [],
        ongoing: [],
      };
      state.isLoading = false;
    });
    builder.addCase(fetchMyBookings.rejected, (state, action) => {
      state.isLoading = false;
    });

    // add-rating
    builder.addCase(addRating.pending, (state, action) => {
      state.reportLoading = true;
    });
    builder.addCase(addRating.fulfilled, (state, action) => {
      state.reportLoading = false;
    });
    builder.addCase(addRating.rejected, (state, action) => {
      state.reportLoading = false;
    });
    // cancel-reason
    builder.addCase(canceledBooking.pending, (state, action) => {
      state.subLoading = true;
    });
    builder.addCase(canceledBooking.fulfilled, (state, action) => {
      state.subLoading = false;
    });
    builder.addCase(canceledBooking.rejected, (state, action) => {
      state.subLoading = false;
    });
    // add-to-wishlist
    builder.addCase(addToWishlist.pending, (state, action) => {
      state.wishListLoading = true;
    });
    builder.addCase(addToWishlist.fulfilled, (state, action) => {
      state.wishListLoading = false;
    });
    builder.addCase(addToWishlist.rejected, (state, action) => {
      state.wishListLoading = false;
    });

    // get-my-wishlist
    builder.addCase(fetchMyWishlist.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchMyWishlist.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.wishlistData = data || {};
      state.isLoading = false;
    });
    builder.addCase(fetchMyWishlist.rejected, (state, action) => {
      state.isLoading = false;
    });
    // get-my-wishlist
    builder.addCase(fetchSubscription.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSubscription.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.plans = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchSubscription.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetchUserDashboardData
    builder.addCase(fetchUserDashboardData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserDashboardData.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      const guestData = data || {
        approved_bookings: 0,
        pending_bookings: 0,
        rejected_bookings: 0,
        total_bookings: 0,
      };
      state.guestDashboardData = [
        {
          title: "Total Booking",
          value: guestData?.total_bookings || 0,
        },
        {
          title: "Approved Booking",
          value: guestData?.approved_bookings || 0,
        },
        {
          title: "Pending Booking",
          value: guestData?.pending_bookings || 0,
        },
        {
          title: "Rejected Booking",
          value: guestData?.rejected_bookings || 0,
        },
      ];
      state.isLoading = false;
    });
    builder.addCase(fetchUserDashboardData.rejected, (state, action) => {
      state.isLoading = false;
    });

    // report-the-property
    builder.addCase(reportTheProperty.pending, (state, action) => {
      state.reportLoading = true;
    });
    builder.addCase(reportTheProperty.fulfilled, (state, action) => {
      state.reportLoading = false;
    });
    builder.addCase(reportTheProperty.rejected, (state, action) => {
      state.reportLoading = false;
    });

    // create-user-inquiry
    builder.addCase(createUserInquiry.pending, (state, action) => {
      state.inquiryLoading = true;
    });
    builder.addCase(createUserInquiry.fulfilled, (state, action) => {
      state.inquiryLoading = false;
    });
    builder.addCase(createUserInquiry.rejected, (state, action) => {
      state.inquiryLoading = false;
    });

    // fetch-single-booking
    builder.addCase(fetchSingleBooking.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSingleBooking.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.bookingDetails = data || {};
      state.isLoading = false;
    });
    builder.addCase(fetchSingleBooking.rejected, (state, action) => {
      state.isLoading = false;
    });

    // upload-booking-documents
    builder.addCase(uploadBookingDocuments.pending, (state, action) => {
      state.uploadLoading = true;
    });
    builder.addCase(uploadBookingDocuments.fulfilled, (state, action) => {
      state.uploadLoading = false;
    });
    builder.addCase(uploadBookingDocuments.rejected, (state, action) => {
      state.uploadLoading = false;
    });
  },
});

export default bookingSlice.reducer;
