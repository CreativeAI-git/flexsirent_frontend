import { createSlice } from "@reduxjs/toolkit";
import { curSym } from "../../utills/pip";
import {
  addBusiness,
  addUser,
  businessStatusUpdate,
  fetchBusiness,
  fetchBusinessUsers,
  fetchUsers,
  fetchUsersBookedProperties,
} from "../actions/userAction";

const initialStates = {
  userLoading: false,
  userTableHeading: [
    "S.No.",
    "User Name",
    "Email",
    "Bookings",
    "Joined On",
    "Status",
    "Block",
    "Action",
  ],
  propertyBookingHeading: [
    "S.No.",
    "Property Title",
    "Booking Date",
    "Price/Month",
    "Status",
    "Action",
  ],
  propertyBookingData: [
    {
      property_name: "Luxury Ocean View Suite",
      booking_date: "02 Jun 2025",
      price: `${curSym}2,800`,
      status: "Upcoming",
    },
    {
      property_name: "Luxury Ocean View Suite",
      booking_date: "02 Jun 2025",
      price: `${curSym}2,800`,
      status: "Checked-In",
    },
    {
      property_name: "Luxury Ocean View Suite",
      booking_date: "02 Jun 2025",
      price: `${curSym}2,800`,
      status: "Upcoming",
    },
    {
      property_name: "Luxury Ocean View Suite",
      booking_date: "02 Jun 2025",
      price: `${curSym}2,800`,
      status: "Cancelled",
    },
    {
      property_name: "Luxury Ocean View Suite",
      booking_date: "02 Jun 2025",
      price: `${curSym}2,800`,
      status: "Completed",
    },
    {
      property_name: "Luxury Ocean View Suite",
      booking_date: "02 Jun 2025",
      price: `${curSym}2,800`,
      status: "Cancelled",
    },
    {
      property_name: "Luxury Ocean View Suite",
      booking_date: "02 Jun 2025",
      price: `${curSym}2,800`,
      status: "Completed",
    },
  ],
  businessTableHeading: [
    "S.No.",
    "Business Name",
    "Contact Person",
    "Country",
    "Total Users",
    "Status",
    "Action",
  ],

  filterOption: [
    { value: "", label: "All" },
    { value: "1", label: "Active" },
    { value: "0", label: "Blocked" },
  ],
  businessUserDetail: {},
  userBookingDetails: {},
  businessList: [],
};

const userSlice = createSlice({
  name: "user",
  initialState: initialStates,
  reducers: {},
  extraReducers: (builder) => {
    // fetch-users
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.userList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
    });
    // business
    builder.addCase(fetchBusiness.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBusiness.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.businessList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchBusiness.rejected, (state, action) => {
      state.isLoading = false;
    });
    // business-status-update
    builder.addCase(businessStatusUpdate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(businessStatusUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(businessStatusUpdate.rejected, (state, action) => {
      state.isLoading = false;
    });

    // business-users
    builder.addCase(fetchBusinessUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBusinessUsers.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.businessUserDetail = data || {};
      state.isLoading = false;
    });
    builder.addCase(fetchBusinessUsers.rejected, (state, action) => {
      state.isLoading = false;
    });
    // users-booked-properties
    builder.addCase(fetchUsersBookedProperties.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsersBookedProperties.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.userBookingDetails = data || {};
      state.isLoading = false;
    });
    builder.addCase(fetchUsersBookedProperties.rejected, (state, action) => {
      state.isLoading = false;
    });

    // add-user
    builder.addCase(addUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.isLoading = false;
    });
    // add-business
    builder.addCase(addBusiness.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addBusiness.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addBusiness.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default userSlice.reducer;
