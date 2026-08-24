import { createSlice } from "@reduxjs/toolkit";
import { fetchBookinDetailgById, fetchBookings, fetchDashboard, fetchPayments, guestOrBusinessPay, payForBooking } from "../actions/bookingAction";

const initialStates = {
  isLoading: false,
  options: [
    { value: "", label: "All" },
    { value: "Checked-In", label: "Checked-In" },
    { value: "Completed", label: "Completed" },
    { value: "Upcoming", label: "Upcoming" },
    { value: "Cancelled", label: "Cancelled" },
  ],
  options1: [
    { value: "", label: "All" },
    { value: "Last 30 days", label: "Last 30 days" },
  ],
  statusOpt: [
    { value: "", label: "All" },
    { value: "Pending", label: "Pending" },
    { value: "Paid", label: "Paid" },
    { value: "Cancelled", label: "Cancelled" },
    { value: "Cancelled", label: "Cancelled" },
  ],
  dayOpt: [
    { value: "", label: "All" },
    { value: "Last 30 days", label: "Last 30 days" },
  ],
  recentBookingHeader: [
    "S.No.",
    "Host",
    "Guest",
    "Property Name",
    "Property Type",
    "Price/Month",
    "Booking Status",
    "Payment Status",
    "Action",
  ],
  paymentDetailsHeader: [
    "S.No.",
    "Month",
    "Amount",
    "Payment Date",
    "Payment Status",
    "Payment Method",
    "Action",
  ],
  paymentsHeader: [
    "S.No.",
    "Host",
    "Guest",
    "Payout Amount",
    "Payout Method",
    "Date",
    "Status",
    "Action",
  ],
  businessDashboard: [
    {
      title: "Total Bookings",
      value: 0,
    },
    {
      title: "Total Users",
      value: 0,
    },
    {
      title: "Total User's Bookings",
      value: 0,
    },

  ],
  bookingList: [
    {
      host: "John D.",
      guest: "Maria",
      property_Title: "Modern Downtown",
      property_type: "Apartments",
      monthly_price: "2,800",
      status: "Checked-In",
    },
    {
      host: "John D.",
      guest: "Maria",
      property_Title: "Modern Downtown",
      property_type: "Apartments",
      monthly_price: "2,800",
      status: "Upcoming",
    },
  ],
  paymentDetailsList: [
    {
      month: "January 2025",
      amt: 2850,
      pay_date: "25 Jan, 2024",
      payment_status: "Paid",
      payment_mathod: "Debit Card",
    },
  ],
  paymentsList: [
    {
      host: "John D.",
      guest: "Maria",
      pay_amt: "1,200.00",
      property_mathod: "PayPal",
      date: "20 August, 2024",
      status: "Pending",
    },
  ],
  bookingDetail: {},
  guestBusinessDashboardData: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState: initialStates,
  reducers: {},
  extraReducers: (builder) => {
    // fetch-dashboard
    builder.addCase(fetchDashboard.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDashboard.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.businessDashboard[0].value = data?.total_bookings || 0;
      state.businessDashboard[1].value = data?.total_users || 0;
      state.businessDashboard[2].value = data?.total_users_booking || 0;
      state.isLoading = false;
    });
    builder.addCase(fetchDashboard.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-dashboard
    builder.addCase(fetchBookings.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBookings.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.bookingList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchBookings.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-dashboard
    builder.addCase(fetchBookinDetailgById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBookinDetailgById.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.bookingDetail = data || {};
      state.isLoading = false;
    });
    builder.addCase(fetchBookinDetailgById.rejected, (state, action) => {
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
    // guestOrBusinessPaySuccess
    builder.addCase(guestOrBusinessPay.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(guestOrBusinessPay.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(guestOrBusinessPay.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-payments
    builder.addCase(fetchPayments.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPayments.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.paymentsList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchPayments.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default bookingSlice.reducer;
