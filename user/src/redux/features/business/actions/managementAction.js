import { API_REQUEST } from "../..";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  businessRegistrationTypesAPI,
  createUserAPI,
  getDocTypesAPI,
  getUserKycDocumentAPI,
  governmentIdTypesAPI,
  guestBusinessUsersAPI,
  proofOfAddressTypesAPI,
  updateKycAPI,
  updateUserAPI,
  updateUserBlockStatusAPI,
} from "../../../../shared/routes/apiURLs";

// fetch-doc-types
export const fetchDocTypes = createAsyncThunk("fetch-doc-types", async () => {
  try {
    const response = await API_REQUEST({
      url: getDocTypesAPI,
      method: "GET",
      panel: "guestBusiness",
    });
    return response;
  } catch (error) { }
});

// getUserKycDocumentAPI
export const getUserKYCDocumentData = createAsyncThunk("fetch-user-kyc-doc", async () => {
  try {
    const response = await API_REQUEST({
      url: getUserKycDocumentAPI,
      method: "GET",
      panel: "guestBusiness",
    });
    return response;
  } catch (error) { }
});

// update-kyc
export const updateKycDoc = createAsyncThunk("update-kyc", async (props) => {
  try {
    const { payload, callback } = props
    const response = await API_REQUEST({
      url: updateKycAPI,
      method: "POST",
      panel: "guestBusiness",
      data: payload
    });
    callback(response)
    return response;
  } catch (error) { }
});

// fetch-business-registration-types
export const fetchBusinessRegistrationTypes = createAsyncThunk("fetch-business-registration-types", async () => {
  try {
    const response = await API_REQUEST({
      url: businessRegistrationTypesAPI,
      method: "GET",
      panel: "guestBusiness",
    });
    return response;
  } catch (error) { }
});

// fetch-proof-of-address-types
export const fetchProofOfAddressTypes = createAsyncThunk("fetch-proof-of-address-types", async () => {
  try {
    const response = await API_REQUEST({
      url: proofOfAddressTypesAPI,
      method: "GET",
      panel: "guestBusiness",
    });
    return response;
  } catch (error) { }
});

// fetch-government-id-types
export const fetchGovernmentIdTypes = createAsyncThunk("fetch-government-id-types", async () => {
  try {
    const response = await API_REQUEST({
      url: governmentIdTypesAPI,
      method: "GET",
      panel: "guestBusiness",
    });
    return response;
  } catch (error) { }
});

// fetch-guest-business-users
export const fetchUsers = createAsyncThunk("fetch-guest-business-users", async () => {
  try {
    const response = await API_REQUEST({
      url: guestBusinessUsersAPI,
      method: "GET",
      panel: "guestBusiness",
    });
    return response;
  } catch (error) { }
});

// create-user
export const createUser = createAsyncThunk("create-user", async (props) => {
  try {
    const { payload, callback } = props
    const response = await API_REQUEST({
      url: createUserAPI,
      method: "POST",
      panel: "guestBusiness",
      data: payload
    });
    callback(response)
    return response;
  } catch (error) { }
});

// update-user
export const updateUser = createAsyncThunk("update-user", async (props) => {
  try {
    const { payload, callback } = props
    const response = await API_REQUEST({
      url: updateUserAPI,
      method: "POST",
      panel: "guestBusiness",
      data: payload
    });
    callback(response)
    return response;
  } catch (error) { }
});

// update-user-block-status
export const updateUserBlockStatus = createAsyncThunk("update-user-block-status", async (props) => {
  try {
    const { payload, callback } = props
    const response = await API_REQUEST({
      url: updateUserBlockStatusAPI,
      method: "POST",
      panel: "guestBusiness",
      data: payload
    });
    callback(response)
    return response;
  } catch (error) { }
});
