import { API_REQUEST } from ".";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { addSubAdminAPI, cardDataAPI, permissionsAPI, subAdminsAPI, subAdminStatusUpdateAPI, updateSubAdminAPI } from "../../routes/BackendRouts";


// sub-admins
export const fetchSubAdmins = createAsyncThunk("sub-admins", async () => {
    try {
        const response = await API_REQUEST({
            url: subAdminsAPI,
            method: "GET"
        });
        return response;
    } catch (error) {
        console.log(error)
    }
});
// sub-admin-permissions
export const fetchSubAdminPermissions = createAsyncThunk("sub-admin-permissions", async () => {
    try {
        const response = await API_REQUEST({
            url: permissionsAPI,
            method: "GET"
        });
        return response;
    } catch (error) {
        console.log(error)
    }
});
// create-sub-admin
export const createSubAdmin = createAsyncThunk("create-sub-admin", async (props) => {
    try {
        const {payload,callback} = props;
        const response = await API_REQUEST({
            url: addSubAdminAPI,
            method: "POST",
            data:payload,
        });
        callback(response);
        return response;
    } catch (error) {
        console.log(error)
    }
});
// update-sub-admin
export const updateSubAdmin = createAsyncThunk("update-sub-admin", async (props) => {
    try {
        const {payload,callback} = props;
        const response = await API_REQUEST({
            url: updateSubAdminAPI,
            method: "POST",
            data:payload,
        });
        callback(response);
        return response;
    } catch (error) {
        console.log(error)
    }
});
// sub-admin-status-update
export const subAdminStatusUpdate = createAsyncThunk("sub-admin-status-update", async (props) => {
    try {
        const {payload,callback} = props;
        const response = await API_REQUEST({
            url: subAdminStatusUpdateAPI,
            method: "POST",
            data:payload,
        });
        callback(response);
        return response;
    } catch (error) {
        console.log(error)
    }
});


// card-data
export const fetchCardData = createAsyncThunk("card-data", async () => {
    try {
        const response = await API_REQUEST({
            url: cardDataAPI,
            method: "GET"
        });
        return response;
    } catch (error) {
        console.log(error)
    }
});