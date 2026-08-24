import { createSlice } from "@reduxjs/toolkit";
import {
  createMultipleOffer,
  fetchHostOffers,
  fetchHostPropertiesWithoutOffer,
  updateOfferStatus,
} from "../actions/reviewAction";

const initialStates = {
  reviewLoading: false,
  offerSubmitting: false,
  offerStatusUpdating: false,
  reviewsHeading: [
    "S.No.",
    "Guest",
    "Email",
    "Property Name",
    "Rating",
    "Date",
    "Review",
    "Action",
  ],
  allReviewData: [
    {
      guest: "Robert Decosta",
      email: "robert@mailinator.com",
      property_title: "Modern Downtown",
      rating: "5 Star",
      date: "20 August, 2024",
      review: "Great location, just.....",
    },
  ],
  reviewDropDown: [
    { value: "", label: "All" },
    { value: "5", label: "5 Star" },
    { value: "4", label: "4 Star" },
    { value: "3", label: "3 Star" },
    { value: "2", label: "2 Star" },
    { value: "1", label: "1 Star" },
  ],
  offersHeading: [
    "S.No.",
    "Property Name",
    "Discount",
    "Start Date",
    "End Date",
    "Status",
    "Action",
  ],
  allOffersData: [],
  offerPropertyOptions: [],
  allNotificationData: [
    {
      title: "New Booking Received!",
      message:
        "A new guest has booked your apartment. Booking details, check-in/check-out dates, and payment summary are available in your host dashboard. Please review and prepare for their arrival.",
      date: "2 hours ago",
    },
    {
      title: "Your Listing Is Now Live!",
      message:
        "Your property has been successfully published and is now visible to students and nomads across the platform. You will be notified when someone sends an inquiry or makes a booking.",
      date: "2 hours ago",
    },
    {
      title: "You Have a New Message",
      message:
        "A guest has reached out with a question about your listing. Open your dashboard to view and respond promptly so you do not miss a booking.",
      date: "2 hours ago",
    },
  ],
};

const reviewSlice = createSlice({
  name: "host",
  initialState: initialStates,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchHostOffers.pending, (state) => {
      state.reviewLoading = true;
    });
    builder.addCase(fetchHostOffers.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.allOffersData = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];
      state.reviewLoading = false;
    });
    builder.addCase(fetchHostOffers.rejected, (state) => {
      state.reviewLoading = false;
    });

    builder.addCase(fetchHostPropertiesWithoutOffer.pending, (state) => {
      state.reviewLoading = true;
    });
    builder.addCase(fetchHostPropertiesWithoutOffer.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.offerPropertyOptions = Array.isArray(data)
        ? data
        : Array.isArray(data?.data)
          ? data.data
          : [];
      state.reviewLoading = false;
    });
    builder.addCase(fetchHostPropertiesWithoutOffer.rejected, (state) => {
      state.reviewLoading = false;
    });

    builder.addCase(createMultipleOffer.pending, (state) => {
      state.offerSubmitting = true;
    });
    builder.addCase(createMultipleOffer.fulfilled, (state) => {
      state.offerSubmitting = false;
    });
    builder.addCase(createMultipleOffer.rejected, (state) => {
      state.offerSubmitting = false;
    });

    builder.addCase(updateOfferStatus.pending, (state) => {
      state.offerStatusUpdating = true;
    });
    builder.addCase(updateOfferStatus.fulfilled, (state) => {
      state.offerStatusUpdating = false;
    });
    builder.addCase(updateOfferStatus.rejected, (state) => {
      state.offerStatusUpdating = false;
    });
  },
});

export default reviewSlice.reducer;
