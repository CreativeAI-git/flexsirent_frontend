import { createSlice } from "@reduxjs/toolkit";
import {
  createNewSupport,
  fetchPayHistory,
  fetchPayHistoryDetails,
  fetchReports,
  fetchUserBookings,
  fetchUserInquiries,
  fetchUserSupport,
} from "../actions/inboxAction";

const initialState = {
  isLoading: false,
  options: [
    { value: "", label: "All" },
    { value: "Pending", label: "Pending" },
    { value: "Reviewed", label: "Reviewed" },
  ],
  options1: [
    { value: "", label: "All" },
    { value: "Last 30 days", label: "Last 30 days" },
  ],
  bookingHeader: [
    "S.No.",
    "Property Name",
    "Message",
    "Date",
    "Status",
    "Action",
  ],
  otherHeader: ["S.No", "Message", "Date", "Status", "Action"],
  payementHisTableHeader: [
    "S.No.",
    "Host",
    "Property Name",
    "Address",
    "Booked On",
    "Status",
    "Action",
  ],
  payementHisDetailTableHeader: [
    "S.No.",
    "Duration",
    "Amount",
    "Payment Date",
    "Payment Method",
    "Payment Status",
    // "Action",
  ],
  reportHeader:[
              "S.No.",
              "Property Title",
              "Report Title",
              "Description",
              "Reported Date",
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
  payHisDetailList: [
    {
      month: "January 2025",
      amt: "2,850",
      date: "25 Jan, 2024",
      payment_method: "Debit Card",
      status: "Paid",
    },
    {
      month: "January 2025",
      amt: "2,850",
      date: "25 Jan, 2024",
      payment_method: "Debit Card",
      status: "Paid",
    },
  ],
  payHisList: [],
  reportList: [],
  inquiryList: [],
  payHisData: {},
  userBookingList: [],
  userSupportList: {},
};
const inboxSlice = createSlice({
  name: "inbox",
  initialState: initialState,
  extraReducers: (builder) => {
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
    // new-support
    builder.addCase(createNewSupport.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createNewSupport.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createNewSupport.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetch-user-support
    builder.addCase(fetchUserSupport.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserSupport.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      const result =
        data?.reduce(
          (acc, item) => {
            if (item.property_id === 0) {
              acc.Other.push(item);
            } else {
              acc.Booking.push(item);
            }
            return acc;
          },
          { Booking: [], Other: [] }
        ) || {};
      state.userSupportList = result || [];
      state.isLoading = false;
    });
    builder.addCase(fetchUserSupport.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetch-pay-history
    builder.addCase(fetchPayHistory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPayHistory.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.payHisList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchPayHistory.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetch-pay-history-details
    builder.addCase(fetchPayHistoryDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPayHistoryDetails.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.payHisData = data || {};
      state.isLoading = false;
    });
    builder.addCase(fetchPayHistoryDetails.rejected, (state, action) => {
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

    // fetch-user-inquiries
    builder.addCase(fetchUserInquiries.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserInquiries.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.inquiryList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchUserInquiries.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default inboxSlice.reducer;
