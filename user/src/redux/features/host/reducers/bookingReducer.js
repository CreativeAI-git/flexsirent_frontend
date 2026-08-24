import { createSlice } from "@reduxjs/toolkit";
import {
  createNewProperty,
  deleteProperty,
  editNewProperty,
  fetchAmenties,
  fetchBookingById,
  fetchBookings,
  fetchCheckouts,
  fetchCliningManage,
  fetchHostDashboardData,
  fetchHouseRules,
  fetchHostReviews,
  fetchIdeals,
  fetchProperties,
  fetchPropertyTypes,
  fetchSaftyAmenties,
  listingForYou,
  makeCheckout,
  updateBookingStatus,
  updateCleaningStatus,
} from "../actions/bookingAction";
import { curSym } from "../../../../shared/utils/pip";

const initialStates = {
  isLoading: false,
  hostRecentBookingData: [
    {
      guest: "Robert Decosta",
      email: "robert@mailinator.com",
      property_type: "Home",
      date: "20 August, 2024",
      status: "Checked-In",
    },
    {
      guest: "Robert Decosta",
      email: "robert@mailinator.com",
      property_type: "Home",
      date: "20 August, 2024",
      status: "Checked-In",
    },
    {
      guest: "Robert Decosta",
      email: "robert@mailinator.com",
      property_type: "Home",
      date: "20 August, 2024",
      status: "Checked-In",
    },
    {
      guest: "Robert Decosta",
      email: "robert@mailinator.com",
      property_type: "Home",
      date: "20 August, 2024",
      status: "Checked-In",
    },
    {
      guest: "Robert Decosta",
      email: "robert@mailinator.com",
      property_type: "Home",
      date: "20 August, 2024",
      status: "Checked-In",
    },
    {
      guest: "Robert Decosta",
      email: "robert@mailinator.com",
      property_type: "Home",
      date: "20 August, 2024",
      status: "Checked-In",
    },
    {
      guest: "Robert Decosta",
      email: "robert@mailinator.com",
      property_type: "Home",
      date: "20 August, 2024",
      status: "Checked-In",
    },
  ],
  hostRecentBookingHeader: [
    "S.No.",
    "Property Title",
    "Guest",
    "Booked Date",
    "Status",
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
  paymentDetailsData: [],
  bookingDropDown: [
    { value: "Host", label: "Host" },
    { value: "Guest", label: "Guest" },
  ],
  propertyHeader: [
    "S.No.",
    "Property Name",
    "Property Type",
    "Location",
    "Price/Month",
    "Listed On",
    "Status",
    "Actions",
  ],
  listingHeader: [
    "S.No.",
    "Website Address",
    "Post Code",
    "Location",
    "Submission Date",
  ],
  checkoutHeader: [
    "S.No.",
    "Property Title",
    "Guest",
    "Booked Date",
    "Check-Out Date",
    "Action",
  ],
  hostReviewsHeader: [
    "S.No.",
    "User Name",
    "Property Name",
    "Rating",
    "Review",
    "Date",
    "Action",
  ],
  hostReviewsFilter: [
    { value: "", label: "All Ratings" },
    { value: "5", label: "5 Star" },
    { value: "4", label: "4 Star" },
    { value: "3", label: "3 Star" },
    { value: "2", label: "2 Star" },
    { value: "1", label: "1 Star" },
  ],
  filterOption: [
    { label: "Pending", value: "PENDING" },
    { label: "Cleaning", value: "CLEANING" },
    { label: "Ready to Use", value: "READY" },
  ],
  propertyData: [],
  amenityOptions: [],
  safetyAmenitiesOptions: [],
  idealForOptions: [],
  houseRuleOptions: [],
  propertyTypesOptions: [],
  cleaningList: [],
  checkoutList: [],
  hostReviewsList: [],
  hostReviewsTotal: 0,
  bookingDetails: {},
  hostDashboardData: [
    {
      title: "Total Properties",
      value: 0,
    },
    {
      title: "Total Bookings",
      value: 0,
    },
    {
      title: "Total Revenue",
      value: `${curSym} ${0}`,
    },
    {
      title: "Pending Listings",
      value: 0,
    },
  ],
};

const bookingSlice = createSlice({
  name: "host",
  initialState: initialStates,
  reducers: {},
  extraReducers: (builder) => {
    // fetch-properties
    builder.addCase(fetchProperties.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProperties.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      const propertyData = {
        // propertyListing: data?.filter((item) => item.list_status === 1),
        // listingRequest: data?.filter((item) => item.list_type === 0),
        propertyListing: data?.filter((item) => item.list_status == 1 && item.list_type == 2),
        listingRequest: data?.filter((item) => item.list_status == 0 && item.list_type == 1),
      };

      state.propertyData = propertyData || {};
      state.isLoading = false;
    });
    builder.addCase(fetchProperties.rejected, (state, action) => {
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

    // create-new-property
    builder.addCase(createNewProperty.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createNewProperty.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createNewProperty.rejected, (state, action) => {
      state.isLoading = false;
    });
    // delete-property
    builder.addCase(deleteProperty.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteProperty.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteProperty.rejected, (state, action) => {
      state.isLoading = false;
    });
    // listing-for-you
    builder.addCase(listingForYou.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(listingForYou.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(listingForYou.rejected, (state, action) => {
      state.isLoading = false;
    });
    // edit-new-property
    builder.addCase(editNewProperty.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(editNewProperty.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(editNewProperty.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetch-bookings
    builder.addCase(fetchBookings.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBookings.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.hostRecentBookingData = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchBookings.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-booking-detail-by-id
    builder.addCase(fetchBookingById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBookingById.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.bookingDetails = data || {};
      state.isLoading = false;
    });
    builder.addCase(fetchBookingById.rejected, (state, action) => {
      state.isLoading = false;
    });
    // update-booking-status
    builder.addCase(updateBookingStatus.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateBookingStatus.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateBookingStatus.rejected, (state, action) => {
      state.isLoading = false;
    });


    // fetch-cleaning-manage
    builder.addCase(fetchCheckouts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCheckouts.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.checkoutList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchCheckouts.rejected, (state, action) => {
      state.isLoading = false;
    });


    // fetch-cleaning-manage
    builder.addCase(fetchCliningManage.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCliningManage.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.cleaningList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchCliningManage.rejected, (state, action) => {
      state.isLoading = false;
    });

    // update-cleaning-status
    builder.addCase(updateCleaningStatus.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateCleaningStatus.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateCleaningStatus.rejected, (state, action) => {
      state.isLoading = false;
    });
    // make-checkout
    builder.addCase(makeCheckout.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(makeCheckout.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(makeCheckout.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetchHostDashboardData
    builder.addCase(fetchHostDashboardData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHostDashboardData.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      const dash = data?.dashboard || {
        pending_listings: 0,
        total_bookings: 0,
        total_properties: 0,
        total_revenue: 0
      };
      state.hostDashboardData = [
        {
          title: "Total Properties",
          value: dash.total_properties,
        },
        {
          title: "Total Bookings",
          value: dash.total_bookings,
        },
        {
          title: "Total Revenue",
          value: `${curSym} ${dash.total_revenue}`,
        },
        {
          title: "Pending Listings",
          value: dash.pending_listings,
        },
      ];
      state.hostRecentBookingData = data?.recent_bookings || [];
      state.isLoading = false;
    });
    builder.addCase(fetchHostDashboardData.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-host-reviews
    builder.addCase(fetchHostReviews.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHostReviews.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.hostReviewsList = data?.data || [];
      state.hostReviewsTotal = data?.total || 0;
      state.isLoading = false;
    });
    builder.addCase(fetchHostReviews.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default bookingSlice.reducer;
