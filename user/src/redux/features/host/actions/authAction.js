import { API_REQUEST } from "../..";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createSubHostAPI,
  hostAllowPermissionAPI,
  hostPasswordChangeAPI,
  hostPermissionsAPI,
  hostProfileAPI,
  hostStripeSetupAPI,
  subHostAPI,
  subHostDetailAPI,
  updateHostProfileAPI,
  updateSubHostAPI,
  updateSubHostStatusAPI,
} from "../../../../shared/routes/apiURLs";

// fetch-host-profile
export const fetchHostProfile = createAsyncThunk(
  "fetch-host-profile",
  async () => {
    try {
      const response = await API_REQUEST({
        url: hostProfileAPI,
        method: "GET",
      });
      return response;
    } catch (error) { }
  }
);

// fetch-host-allow-permission
export const fetchHostAllowPermission = createAsyncThunk(
  "fetch-host-allow-permission",
  async () => {
    try {
      const response = await API_REQUEST({
        url: hostAllowPermissionAPI,
        method: "GET",
      });
      return response;
    } catch (error) { }
  }
);

// Chnage-host-password
export const changeHostPassword = createAsyncThunk(
  "change-host-password",
  async (props) => {
    const { payload, callback } = props;
    try {
      const response = await API_REQUEST({
        url: hostPasswordChangeAPI,
        method: "POST",
        data: payload,
      });
      callback(response);
      return response;
    } catch (error) {
      callback(null, error);
    }
  }
);

// update-host-profile
export const updateHostProfileData = createAsyncThunk(
  "update-host-profile",
  async (props) => {
    const { payload, callback } = props;
    try {
      const response = await API_REQUEST({
        url: updateHostProfileAPI,
        method: "POST",
        data: payload,
      });
      callback(response);
      return response;
    } catch (error) {
      callback(null, error);
    }
  }
);

export const createHostStripeSetup = createAsyncThunk(
  "create-host-stripe-setup",
  async (props) => {
    const { payload, callback } = props;
    try {
      const response = await API_REQUEST({
        url: hostStripeSetupAPI,
        method: "POST",
        data: payload,
      });
      callback(response);
      return response;
    } catch (error) {
      callback(null, error);
    }
  },
);

// fetch-sub-host
export const fetchSubHost = createAsyncThunk("fetch-sub-host", async () => {
  try {
    const response = await API_REQUEST({
      url: subHostAPI,
      method: "GET",
    });
    return response;
  } catch (error) { }
});

// fetch-host-permissons
export const fetchHostPermissions = createAsyncThunk(
  "fetch-host-permissons",
  async () => {
    try {
      const response = await API_REQUEST({
        url: hostPermissionsAPI,
        method: "GET",
      });
      return response;
    } catch (error) { }
  }
);

// create-sub-host
export const createSubHost = createAsyncThunk(
  "create-sub-host",
  async (props) => {
    const { payload, callback } = props;
    try {
      const response = await API_REQUEST({
        url: createSubHostAPI,
        method: "POST",
        data: payload,
      });
      callback(response);
      return response;
    } catch (error) {
      callback(null, error);
    }
  }
);
// update-sub-host
export const updateSubHost = createAsyncThunk(
  "update-sub-host",
  async (props) => {
    const { payload, callback } = props;
    try {
      const response = await API_REQUEST({
        url: updateSubHostAPI,
        method: "POST",
        data: payload,
      });
      callback(response);
      return response;
    } catch (error) {
      callback(null, error);
    }
  }
);
// update-sub-host-status
export const updateSubHostStatus = createAsyncThunk(
  "update-sub-host-status",
  async (props) => {
    const { payload, callback } = props;
    try {
      const response = await API_REQUEST({
        url: updateSubHostStatusAPI + payload,
        method: "POST",
      });
      callback(response);
      return response;
    } catch (error) {
      callback(null, error);
    }
  }
);
// fetch-sub-host-status
export const fetchSubHostDetails = createAsyncThunk(
  "fetch-sub-host-status",
  async (props) => {
    const { payload } = props;
    try {
      const response = await API_REQUEST({
        url: subHostDetailAPI + payload,
        method: "GET",
      });
      return response;
    } catch (error) {
    }
  }
);
