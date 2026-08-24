import { API_REQUEST } from ".";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
    getSeoManagementAPI,
    sendReplyAPI,
    supportsAPI,
    updateSeoManagementAPI,
} from "../../routes/BackendRouts";


// fetch-supports
export const fetchSupports = createAsyncThunk("fetch-supports", async () => {
    try {
        const response = await API_REQUEST({
            url: supportsAPI,
            method: "GET"
        });
        return response;
    } catch (error) {
        console.log(error)
    }
});
// send-reply
export const sendReply = createAsyncThunk("send-reply", async (props) => {
    try {
        const {payload,callback} = props;
        const response = await API_REQUEST({
            url: sendReplyAPI,
            method: "POST",
            data:payload,
        });
        callback(response);
        return response;
    } catch (error) {
        console.log(error)
    }
});

// get-seo-management
export const getSeoManagementData = createAsyncThunk("get-seo-management", async (props = {}) => {
    try {
        const { callback } = props;
        const response = await API_REQUEST({
            url: getSeoManagementAPI,
            method: "GET",
            isSuccessToast: false,
            isErrorToast: false,
        });
        if (callback) callback(response);
        return response;
    } catch (error) {
        const { callback } = props;
        if (callback) callback(null, error);
        console.log(error);
    }
});

// update-seo-management
export const updateSeoManagementData = createAsyncThunk(
    "update-seo-management",
    async (props) => {
        try {
            const { payload, callback } = props;
            const response = await API_REQUEST({
                url: updateSeoManagementAPI,
                method: "POST",
                data: payload,
            });
            if (callback) callback(response);
            return response;
        } catch (error) {
            const { callback } = props;
            if (callback) callback(null, error);
        }
    }
);
