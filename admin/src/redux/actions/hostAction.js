import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addHostAPI,
  amentiesAPI,
  hostPropertiesAPI,
  hostsAPI,
  hostStatusUpdateAPI,
  idialsAPI,
  listingCardsAPI,
  listingsAPI,
  propertiesAPI,
  propertyStatusUpdateAPI,
  propertyTypesAPI,
  saftyMentiesAPI,
  updatePropertyListingAPI,
  dashboardAPI,
  houseRulesAPI,
  contactUsAPI,
  hostBusinessAPI,
  hostBusinessDetailsAPI,
  hostBusinessSubHostsAPI,
  bookingsAPI,
  bookingDetailAPI
} from "../../routes/BackendRouts";
import { API_REQUEST } from ".";

// fetch-dashboard
export const fetchDashboard = createAsyncThunk("fetch-dashboard", async (props) => {
  try {
    const response = await API_REQUEST({
      url: dashboardAPI,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
});
// fetch-bookings
export const fetchBookings = createAsyncThunk("fetch-bookings", async (props) => {
  try {
    const response = await API_REQUEST({
      url: bookingsAPI,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
});

// fetch-booking-detail
export const fetchBookingDetail = createAsyncThunk("fetch-booking-detail", async (props) => {
  try {
    const response = await API_REQUEST({
      url: bookingDetailAPI+props,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
});

// properties
export const fetchProperties = createAsyncThunk("properties", async (props) => {
  try {
    const response = await API_REQUEST({
      url: propertiesAPI,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
});
// propety-status-update
export const propetyStatusUpdate = createAsyncThunk(
  "propety-status-update",
  async (props) => {
    try {
      const { payload, callback } = props;
      const response = await API_REQUEST({
        url: propertyStatusUpdateAPI,
        method: "POST",
        data: payload,
      });
      callback(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// listing-requests
export const fetchListingRequest = createAsyncThunk(
  "listing-requests",
  async (props) => {
    try {
      const response = await API_REQUEST({
        url: listingsAPI,
        method: "GET",
        params :props || {}
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// fetch-property-types
export const fetchPropertyTypes = createAsyncThunk(
  "fetch-property-types",
  async () => {
    try {
      const response = await API_REQUEST({
        url: propertyTypesAPI,
        method: "GET",
        panel: "host",
      });
      return response;
    } catch (error) {}
  }
);
// fetch-amenties
export const fetchAmenties = createAsyncThunk("fetch-amenties", async () => {
  try {
    const response = await API_REQUEST({
      url: amentiesAPI,
      method: "GET",
      panel: "host",
    });
    return response;
  } catch (error) {}
});
// fetch-safty-amenties
export const fetchSaftyAmenties = createAsyncThunk(
  "fetch-safty-amenties",
  async () => {
    try {
      const response = await API_REQUEST({
        url: saftyMentiesAPI,
        method: "GET",
        panel: "host",
      });
      return response;
    } catch (error) {}
  }
);
// fetch-ideals
export const fetchIdeals = createAsyncThunk("fetch-ideals", async () => {
  try {
    const response = await API_REQUEST({
      url: idialsAPI,
      method: "GET",
      panel: "host",
    });
    return response;
  } catch (error) {}
});

// fetch-house-rules
export const fetchHouseRules = createAsyncThunk("fetch-house-rules", async () => {
  try {
    const response = await API_REQUEST({
      url: houseRulesAPI,
      method: "GET",
      panel: "host",
    });
    return response;
  } catch (error) {}
});

// update-new-property
export const updateNewProperty = createAsyncThunk(
  "update-new-property",
  async (props) => {
    const { callback, payload } = props || {};
    try {
      const response = await API_REQUEST({
        url: updatePropertyListingAPI,
        method: "POST",
        data: payload,
      });
      callback(response);
      return response;
    } catch (error) {}
  }
);
// listing-cards
export const fetchListingCards = createAsyncThunk(
  "listing-cards",
  async (props) => {
    try {
      const response = await API_REQUEST({
        url: listingCardsAPI,
        method: "GET",
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// hosts
export const fetchHosts = createAsyncThunk("hosts", async () => {
  try {
    const response = await API_REQUEST({
      url: hostsAPI,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
});
// hosts-properties
export const fetchHostProperties = createAsyncThunk(
  "hosts-properties",
  async (props) => {
    try {
      const { payload } = props;
      const response = await API_REQUEST({
        url: hostPropertiesAPI,
        method: "GET",
        params: payload,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
// host-status-update
export const hostStatusUpdate = createAsyncThunk(
  "host-status-update",
  async (props) => {
    try {
      const { payload, callback } = props;
      const response = await API_REQUEST({
        url: hostStatusUpdateAPI,
        method: "POST",
        data: payload,
      });
      callback(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// add-host
export const addHost = createAsyncThunk(
  "add-host",
  async (props) => {
    try {
      const { payload, callback } = props;
      const response = await API_REQUEST({
        url: addHostAPI,
        method: "POST",
        data: payload,
      });
      callback(response);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// contact-us
export const fetchContactUs = createAsyncThunk("contact-us", async (props) => {
  try {
    const response = await API_REQUEST({
      url: contactUsAPI,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
});

// host-business
export const fetchhostBusiness = createAsyncThunk("host-business", async () => {
  try {
    const response = await API_REQUEST({
      url: hostBusinessAPI,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
});

// hosts-business-details
export const fetchHostBusinessDetails = createAsyncThunk(
  "hosts-business-details",
  async (props) => {
    try {
      const { payload } = props;
      const response = await API_REQUEST({
        url: hostBusinessDetailsAPI + payload,
        method: "GET" ,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);
// // update-host-business-status
// export const updateHostBusinessStatus = createAsyncThunk(
//   "update-host-business-status",
//   async (props) => {
//     try {
//       const { payload } = props;
//       const response = await API_REQUEST({
//         url: updateHostBusinessStatusAPI + payload,
//         method: "GET" ,
//       });
//       return response;
//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

// hosts-business-sub-hosts
export const fetchHostBusinessSubHosts = createAsyncThunk(
  "hosts-business-sub-hosts",
  async (props) => {
    try {
      const { payload } = props;
      const response = await API_REQUEST({
        url: hostBusinessSubHostsAPI + payload,
        method: "GET" ,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);