import { createSlice } from "@reduxjs/toolkit";
import {
  fetchReviews,
  deleteReview,
  createReview,
  fetchServiceFee,
  deleteSeriveFee,
  updateServiceFee,
  createServiceFee,
  fetchPropertyForReview,
  updateReview,
  fetchReports,
  fetchPayout,
  fetchPayoutCardData,
  fetchInquiries,
  fetchOffers,
} from "../actions/serviceFeeAction";

const initialStates = {
  isLoading: false,
  tableHeader: [
    "S.No.",
    "Country",
    "State",
    "City",
    "Fee Amount (%)",
    "Actions",
  ],
  reviewTableHeader: [
    "S.No.",
    "Profile Image",
    "User Name",
    "Host Name",
    "Property Name",
    "Rating",
    "Review",
    "Date",
    "Action",
  ],
  reportHeader: [
    "S.No.",
    "Property Title",
    "Reported By",
    "Report Title",
    "Description",
    "Reported Date",
    // "Status",
    "Action",
  ],
  inquiryHeader: [
    "S.No.",
    "User Name",
    "Email",
    "Property Title",
    "Message",
    "Date",
    "Action",
  ],
  offerHeader: [
    "S.No.",
    "Property Name",
    "Discount",
    "Start Date",
    "End Date",
    "Status",
    "Action",
  ],
  payoutHeader : ["S.No", "Guest","Host", "Property", "Payout (Host)","Commission", "Date", "Payout Status"],
  list: [
    {
      location: "New York",
      user_type: "Host",
      fee_type: "Percentage",
      fee_per: "10",
      date: "08 May 2025",
    },
    {
      location: "New York",
      user_type: "Host",
      fee_type: "Percentage",
      fee_per: "10",
      date: "08 May 2025",
    },
  ],
  reviewList: [],
  propertyOptions: [],
  reportList: [],
  inquiryList: [],
  offerList: [],
  payoutList: [],
  payoutCards: {},
};

const serviceSlice = createSlice({
  name: "service",
  initialState: initialStates,
  reducers: {},
  extraReducers: (builder) => {
    // fetch-service-fee
    builder.addCase(fetchServiceFee.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchServiceFee.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.list = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchServiceFee.rejected, (state, action) => {
      state.isLoading = false;
    });
    // delete-service-fee
    builder.addCase(deleteSeriveFee.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteSeriveFee.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteSeriveFee.rejected, (state, action) => {
      state.isLoading = false;
    });
    // create-service-fee
    builder.addCase(createServiceFee.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createServiceFee.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createServiceFee.rejected, (state, action) => {
      state.isLoading = false;
    });
    // update-service-fee
    builder.addCase(updateServiceFee.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateServiceFee.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateServiceFee.rejected, (state, action) => {
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
    // fetch-reviews
    builder.addCase(fetchPropertyForReview.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPropertyForReview.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.propertyOptions = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchPropertyForReview.rejected, (state, action) => {
      state.isLoading = false;
    });

    // delete-review
    builder.addCase(deleteReview.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteReview.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteReview.rejected, (state, action) => {
      state.isLoading = false;
    });
    // create-review
    builder.addCase(createReview.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createReview.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createReview.rejected, (state, action) => {
      state.isLoading = false;
    });
    // update-review
    builder.addCase(updateReview.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateReview.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateReview.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetch-reports
    builder.addCase(fetchReports.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchReports.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.reportList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchReports.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetch-payout
    builder.addCase(fetchPayout.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPayout.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.payoutList = data?.records || [];
      state.isLoading = false;
    });
    builder.addCase(fetchPayout.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-service-fee
    builder.addCase(fetchPayoutCardData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPayoutCardData.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.payoutCards = data || {};
      state.isLoading = false;
    });
    builder.addCase(fetchPayoutCardData.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetch-inquiries
    builder.addCase(fetchInquiries.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchInquiries.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.inquiryList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchInquiries.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetch-offers
    builder.addCase(fetchOffers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOffers.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.offerList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchOffers.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default serviceSlice.reducer;
