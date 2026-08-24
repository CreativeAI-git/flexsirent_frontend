import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSupports,
  getSeoManagementData,
  sendReply,
  updateSeoManagementData,
} from "../actions/supportAction";


const initialStates = {
  isLoading: false,
  seoLoading: false,
  userOrHostHeader: ["S.No", "Message", "Date","Status", "Action"],
  userBookingSupportHeader: ["S.No","Property Name", "Message", "Date","Status", "Action"],
  supportsList: {},
  seoManagementData: null,
   filterOption: [
    { value: "booking", label: "Booking" },
    { value: "other", label: "Other" },
  ],
};

const supportSlice = createSlice({
  name: "support",
  initialState: initialStates,
  reducers: {
        setSuppoortDetail: (state, action) => {
          state.supportDetail = action.payload;
        },
  },
  extraReducers: (builder) => {
    // properties
    builder.addCase(fetchSupports.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSupports.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.supportsList = data || {};
      state.isLoading = false;
    });
    builder.addCase(fetchSupports.rejected, (state, action) => {
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
    // get-seo-management
    builder.addCase(getSeoManagementData.pending, (state, action) => {
      state.seoLoading = true;
    });
    builder.addCase(getSeoManagementData.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.seoManagementData = data ?? null;
      state.seoLoading = false;
    });
    builder.addCase(getSeoManagementData.rejected, (state, action) => {
      state.seoLoading = false;
    });
    // update-seo-management
    builder.addCase(updateSeoManagementData.pending, (state, action) => {
      state.seoLoading = true;
    });
    builder.addCase(updateSeoManagementData.fulfilled, (state, action) => {
      state.seoLoading = false;
    });
    builder.addCase(updateSeoManagementData.rejected, (state, action) => {
      state.seoLoading = false;
    });
  },
});
export const { setSuppoortDetail } = supportSlice.actions;
export default supportSlice.reducer;
