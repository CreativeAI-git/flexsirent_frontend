import { createAsyncThunk } from "@reduxjs/toolkit";
import { API_REQUEST } from "../..";
import {
  createMultipleOfferAPI,
  hostOfferPropertiesAPI,
  hostPropertiesWithoutOfferAPI,
  updateOfferStatusAPI,
} from "../../../../shared/routes/apiURLs";

export const fetchHostOffers = createAsyncThunk(
  "host/fetch-offers",
  async () => {
    try {
      const response = await API_REQUEST({
        url: hostOfferPropertiesAPI,
        method: "GET",
        panel: "host",
      });
      return response;
    } catch (error) {}
  }
);

export const fetchHostPropertiesWithoutOffer = createAsyncThunk(
  "host/fetch-properties-without-offer",
  async () => {
    try {
      const response = await API_REQUEST({
        url: hostPropertiesWithoutOfferAPI,
        method: "GET",
        panel: "host",
      });
      return response;
    } catch (error) {}
  }
);

export const createMultipleOffer = createAsyncThunk(
  "host/create-multiple-offer",
  async (props) => {
    const { payload, callback } = props || {};
    try {
      const response = await API_REQUEST({
        url: createMultipleOfferAPI,
        method: "POST",
        data: payload,
        panel: "host",
      });
      callback?.(response);
      return response;
    } catch (error) {}
  }
);

export const updateOfferStatus = createAsyncThunk(
  "host/update-offer-status",
  async (props) => {
    const { payload, callback } = props || {};
    try {
      const response = await API_REQUEST({
        url: updateOfferStatusAPI,
        method: "POST",
        data: payload,
        panel: "host",
      });
      callback?.(response);
      return response;
    } catch (error) {}
  }
);
