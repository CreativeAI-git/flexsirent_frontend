import { createSlice } from "@reduxjs/toolkit";
import {
  fetchHostQueries,
  fetchPropertyInquiries,
  fetchReports,
  fetchUserQueries,
  sendQuery,
  sendReply,
} from "../actions/inboxAction";

const initialStates = {
  isLoading: false,
  guestInboxHeader: ["S.No", "Guest", "Message", "Date","Status", "Action"],
  hostInboxHeader: ["S.No", "Message", "Date","Status", "Action"],
  inquiryHeader: [
    "S.No.",
    "User Name",
    "Email",
    "Property Title",
    "Message",
    "Date",
    "Action",
  ],
  userQueriesList: [],
  hostQueriesList: [],
  reportList: [],
  propertyInquiryList: [],
  supportDetail: {},
};

const inboxSlice = createSlice({
  name: "inbox",
  initialState: initialStates,
  reducers: {
    setSuppoortDetail: (state, action) => {
      state.supportDetail = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetch-user-queries
    builder.addCase(fetchUserQueries.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserQueries.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.userQueriesList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchUserQueries.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-host-queries
    builder.addCase(fetchHostQueries.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHostQueries.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.hostQueriesList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchHostQueries.rejected, (state, action) => {
      state.isLoading = false;
    });
    // send-query
    builder.addCase(sendQuery.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(sendQuery.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(sendQuery.rejected, (state, action) => {
      state.isLoading = false;
    });
    // send-reply
    builder.addCase(sendReply.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(sendReply.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(sendReply.rejected, (state, action) => {
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

    // fetch-property-inquiries
    builder.addCase(fetchPropertyInquiries.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPropertyInquiries.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.propertyInquiryList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchPropertyInquiries.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { setSuppoortDetail } = inboxSlice.actions;
export default inboxSlice.reducer;
