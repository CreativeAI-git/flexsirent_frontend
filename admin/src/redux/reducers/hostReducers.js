import { curSym } from "../../utills/pip";
import { createSlice } from "@reduxjs/toolkit";
import {
  addHost,
  fetchAmenties,
  fetchHostProperties,
  fetchHosts,
  fetchIdeals,
  fetchListingCards,
  fetchListingRequest,
  fetchProperties,
  fetchDashboard,
  fetchPropertyTypes,
  fetchSaftyAmenties,
  hostStatusUpdate,
  propetyStatusUpdate,
  updateNewProperty,
  fetchHouseRules,
  fetchContactUs,
  fetchhostBusiness,
  fetchHostBusinessDetails,
  fetchHostBusinessSubHosts,
  fetchBookings,
  fetchBookingDetail,
} from "../actions/hostAction";

const initialStates = {
  isLoading: false,
  hostTableHeading: [
    "S.No.",
    "Host",
    "Email",
    "Properties Listed",
    "Joined On",
    "Status",
    "Action",
  ],
  hostBusinessHeader: [
    "S.No.",
    "First Name",
    "Last Name",
    "Email",
    "Phone Number",
    "Status",
    "Action",
  ],
  subHostHeader: [
    "S.No.",
    "First Name",
    "Last Name",
    "Email",
    "Phone Number",
    "Status",
  ],
  hostPropertyTableHeading: [
    "S.No.",
    "Property Name",
    "Listed On",
    "Price/Month",
    "Status",
    "Action",
  ],
  hostPropertyTableData: [
    {
      property_name: "Luxury Ocean View Suite",
      listed_on: "02 Jun 2025",
      price: `${curSym}2,800`,
      status: "Accept",
    },
    {
      property_name: "Luxury Ocean View Suite",
      listed_on: "02 Jun 2025",
      price: `${curSym}2,800`,
      status: "Accept",
    },
    {
      property_name: "Luxury Ocean View Suite",
      listed_on: "02 Jun 2025",
      price: `${curSym}2,800`,
      status: "Accept",
    },
    {
      property_name: "Luxury Ocean View Suite",
      listed_on: "02 Jun 2025",
      price: `${curSym}2,800`,
      status: "Accept",
    },
    {
      property_name: "Luxury Ocean View Suite",
      listed_on: "02 Jun 2025",
      price: `${curSym}2,800`,
      status: "Accept",
    },
    {
      property_name: "Luxury Ocean View Suite",
      listed_on: "02 Jun 2025",
      price: `${curSym}2,800`,
      status: "Accept",
    },
    {
      property_name: "Luxury Ocean View Suite",
      listed_on: "02 Jun 2025",
      price: `${curSym}2,800`,
      status: "Accept",
    },
    {
      property_name: "Luxury Ocean View Suite",
      listed_on: "02 Jun 2025",
      price: `${curSym}2,800`,
      status: "Accept",
    },
  ],
  propertyTableHeading: [
    "S.No.",
    "Property Name",
    "Property Type",
    "Host",
    "Bookings",
    "Listed On",
    "Status",
    "Action",
  ],
  bookingTableHeading: [
    "S.No.",
    "User Name",
    "Host",
    "Property Name",
    "Booking Date",
    "Status",
    "Action",
  ],
  propertyTableData: [
    {
      property_name: "Luxury Ocean View Suite",
      property_type: "Apartment",
      host: "John Doe",
      listed_on: "08 May 2025",
      status: "Approved",
    },
    {
      property_name: "Luxury Ocean View Suite",
      property_type: "Apartment",
      host: "John Doe",
      listed_on: "08 May 2025",
      status: "Approved",
    },
    {
      property_name: "Luxury Ocean View Suite",
      property_type: "Apartment",
      host: "John Doe",
      listed_on: "08 May 2025",
      status: "Approved",
    },
    {
      property_name: "Luxury Ocean View Suite",
      property_type: "Apartment",
      host: "John Doe",
      listed_on: "08 May 2025",
      status: "Approved",
    },
    {
      property_name: "Luxury Ocean View Suite",
      property_type: "Apartment",
      host: "John Doe",
      listed_on: "08 May 2025",
      status: "Approved",
    },
    {
      property_name: "Luxury Ocean View Suite",
      property_type: "Apartment",
      host: "John Doe",
      listed_on: "08 May 2025",
      status: "Approved",
    },
    {
      property_name: "Luxury Ocean View Suite",
      property_type: "Apartment",
      host: "John Doe",
      listed_on: "08 May 2025",
      status: "Approved",
    },
    {
      property_name: "Luxury Ocean View Suite",
      property_type: "Apartment",
      host: "John Doe",
      listed_on: "08 May 2025",
      status: "Approved",
    },
    {
      property_name: "Luxury Ocean View Suite",
      property_type: "Apartment",
      host: "John Doe",
      listed_on: "08 May 2025",
      status: "Approved",
    },
    {
      property_name: "Luxury Ocean View Suite",
      property_type: "Apartment",
      host: "John Doe",
      listed_on: "08 May 2025",
      status: "Approved",
    },
    {
      property_name: "Luxury Ocean View Suite",
      property_type: "Apartment",
      host: "John Doe",
      listed_on: "08 May 2025",
      status: "Approved",
    },
  ],
  requestsHeaders: [
    "S.No.",
    "Host Name",
    "Post Code",
    "Location",
    "Submission Date",
    "Action",
  ],
  contactHeaders: [
    "S.No.",
    "Name",
    "Email",
    "Message",
    "Submitted On",
    "Action",
  ],
  filterOption: [
    { value: "", label: "All" },
    { value: "1", label: "Active" },
    { value: "0", label: "Blocked" },
  ],
  filterBookingOption: [
    { value: "", label: "All" },
    { value: "Completed", label: "Completed" },
    { value: "Pending", label: "Pending" },
    { value: "Cancelled", label: "Cancelled" },
  ],
  filterPropertyOption: [
    { value: "", label: "All" },
    { value: "1", label: "Approved" },
    { value: "0", label: "Pending" },
    { value: "2", label: "Rejected" },
  ],
  bookingTableData: [],
  bookingCount: {},
  requestList: [],
  bookingData: {},
  amenityOptions: [],
  safetyAmenitiesOptions: [],
  idealForOptions: [],
  houseRuleOptions: [],
  propertyTypesOptions: [],
  hostList: [],
  listingCardData: {},
  hostBusinessList: [],
  hostBusinessSubHostDataList: [],
  hostDetail: {},
  hostBusinessData: {},
  cardData: {},
};

const hostSlice = createSlice({
  name: "user",
  initialState: initialStates,
  reducers: {},
  extraReducers: (builder) => {
    // fetch-dashboard
    builder.addCase(fetchDashboard.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDashboard.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.cardData = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchDashboard.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-bookings
    builder.addCase(fetchBookings.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBookings.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.bookingTableData = data?.bookings || [];
      state.bookingCount = data?.counts || {};
      state.isLoading = false;
    });
    builder.addCase(fetchBookings.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-booking-detail
    builder.addCase(fetchBookingDetail.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBookingDetail.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.bookingData = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchBookingDetail.rejected, (state, action) => {
      state.isLoading = false;
    });
    // properties
    builder.addCase(fetchProperties.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProperties.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.propertyTableData = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchProperties.rejected, (state, action) => {
      state.isLoading = false;
    });
    // listing-requests
    builder.addCase(fetchListingRequest.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchListingRequest.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.requestList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchListingRequest.rejected, (state, action) => {
      state.isLoading = false;
    });
    // propety-status-update
    builder.addCase(propetyStatusUpdate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(propetyStatusUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(propetyStatusUpdate.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetch-property-types
    builder.addCase(fetchPropertyTypes.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchPropertyTypes.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.propertyTypesOptions = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchPropertyTypes.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-amenties
    builder.addCase(fetchAmenties.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAmenties.fulfilled, (state, action) => {
      const { data, success } = action?.payload ?? {};
      state.amenityOptions = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchAmenties.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-safty-amenties
    builder.addCase(fetchSaftyAmenties.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSaftyAmenties.fulfilled, (state, action) => {
      const { data, success } = action?.payload ?? {};
      state.safetyAmenitiesOptions = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchSaftyAmenties.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-ideals
    builder.addCase(fetchIdeals.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchIdeals.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.idealForOptions = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchIdeals.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-house-rules
    builder.addCase(fetchHouseRules.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHouseRules.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.houseRuleOptions = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchHouseRules.rejected, (state, action) => {
      state.isLoading = false;
    });

    // update-new-property
    builder.addCase(updateNewProperty.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateNewProperty.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateNewProperty.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-listing-cards
    builder.addCase(fetchListingCards.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchListingCards.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.listingCardData = data || {};
      state.isLoading = false;
    });
    builder.addCase(fetchListingCards.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-hosts
    builder.addCase(fetchHosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHosts.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.hostList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchHosts.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-host-properties
    builder.addCase(fetchHostProperties.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHostProperties.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.hostDetail = data || {};
      state.isLoading = false;
    });
    builder.addCase(fetchHostProperties.rejected, (state, action) => {
      state.isLoading = false;
    });

    // host-status-update
    builder.addCase(hostStatusUpdate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(hostStatusUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(hostStatusUpdate.rejected, (state, action) => {
      state.isLoading = false;
    });
    // add-host
    builder.addCase(addHost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(addHost.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(addHost.rejected, (state, action) => {
      state.isLoading = false;
    });

    // contact-us
    builder.addCase(fetchContactUs.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchContactUs.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.queryList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchContactUs.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetch-host-business
    builder.addCase(fetchhostBusiness.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchhostBusiness.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.hostBusinessList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchhostBusiness.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-host-business-details
    builder.addCase(fetchHostBusinessDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHostBusinessDetails.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.hostBusinessData = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchHostBusinessDetails.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-host-business-sub-hosts
    builder.addCase(fetchHostBusinessSubHosts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHostBusinessSubHosts.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.hostBusinessSubHostDataList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchHostBusinessSubHosts.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default hostSlice.reducer;
