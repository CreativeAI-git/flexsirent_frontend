import { API_REQUEST } from ".";
import { setToken } from "../../utills/pip";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  blogsAPI,
  ChangePasswordAPI,
  createBlogAPI,
  deleteBlogAPI,
  deleteNotificationAPI,
  fetchAdminNotificationsAPI,
  forgotPasswordAPI,
  getCancellationPolicySettingsAPI,
  getAllKYCDocumentAPI,
  getMyProfileAPI,
  getPolicyAPI,
  kycDeatilAPI,
  loginAPI,
  updateBlogAPI,
  updateCancellationPolicySettingsAPI,
  UpdateKYCStatusAPI,
  updateMyProfileAPI,
  updatePolicyAPI,
  varificationRequestsAPI,
} from "../../routes/BackendRouts";

export const authLogin = createAsyncThunk("auth-login", async (props) => {
  const { payload, callback } = props;
  try {
    const response = await API_REQUEST({
      url: loginAPI,
      method: "POST",
      data: payload,
    });
    if (response?.data?.jwt_token) {
      setToken("admin", response?.data?.jwt_token);
    }
    const type = response?.data?.user_type == 1 ? "Admin" : "Sub Admin";
    localStorage.setItem("adminRole", type);
    localStorage.setItem(
      "subAdminPermission",
      JSON.stringify(response?.data?.permission || []),
    );
    callback(response);
    return response;
  } catch (error) {
    callback(null, error);
  }
});

export const authForgotPassword = createAsyncThunk(
  "auth-forgot-password",
  async (props) => {
    const { payload, callback } = props;
    try {
      const response = await API_REQUEST({
        url: forgotPasswordAPI,
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

export const authChangePassword = createAsyncThunk(
  "auth-change-password",
  async (props) => {
    const { payload, callback } = props;
    try {
      const response = await API_REQUEST({
        url: ChangePasswordAPI,
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

export const myProfile = createAsyncThunk("my-profile", async (props) => {
  try {
    const response = await API_REQUEST({
      url: getMyProfileAPI,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const updateAdminProfile = createAsyncThunk(
  "update-admin-profile",
  async (props) => {
    const { payload, callback } = props;
    try {
      const response = await API_REQUEST({
        url: updateMyProfileAPI,
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

export const fetchAdminNotifications = createAsyncThunk(
  "fetch-admin-notifications",
  async () => {
    try {
      const response = await API_REQUEST({
        url: fetchAdminNotificationsAPI,
        method: "GET",
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const deleteAdminNotification = createAsyncThunk(
  "delete-admin-notification",
  async (props) => {
    const { payload, callback } = props;
    try {
      const response = await API_REQUEST({
        url: deleteNotificationAPI,
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

export const getAllKYCDocData = createAsyncThunk(
  "get-all-users-kyc-doc",
  async () => {
    try {
      const response = await API_REQUEST({
        url: getAllKYCDocumentAPI,
        method: "GET",
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const updateKYCStatus = createAsyncThunk(
  "update-kyc-status",
  async (props) => {
    const { payload, callback } = props;
    try {
      const response = await API_REQUEST({
        url: UpdateKYCStatusAPI,
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

export const getPolicyData = createAsyncThunk(
  "get-policy-data",
  async (props) => {
    try {
      const { payload } = props;
      const response = await API_REQUEST({
        url: getPolicyAPI + payload,
        method: "GET",
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const updatePolicyData = createAsyncThunk(
  "update-policy-data",
  async (props) => {
    const { payload, callback } = props;
    try {
      const response = await API_REQUEST({
        url: updatePolicyAPI,
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

export const getCancellationPolicySettings = createAsyncThunk(
  "get-cancellation-policy-settings",
  async () => {
    try {
      const response = await API_REQUEST({
        url: getCancellationPolicySettingsAPI,
        method: "GET",
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  },
);

export const updateCancellationPolicySettings = createAsyncThunk(
  "update-cancellation-policy-settings",
  async (props) => {
    const { payload, callback } = props;
    try {
      const response = await API_REQUEST({
        url: updateCancellationPolicySettingsAPI,
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

export const fetchBlogs = createAsyncThunk("fetch-blogs", async () => {
  try {
    const response = await API_REQUEST({
      url: blogsAPI,
      method: "GET",
    });
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const deleteBlog = createAsyncThunk("delete-blog", async (props) => {
  try {
    const { payload, callback } = props;
    const response = await API_REQUEST({
      url: deleteBlogAPI + payload,
      method: "DELETE",
    });
    callback(response);
    return response;
  } catch (error) {
    console.log(error);
  }
});

export const createBlog = createAsyncThunk("create-blog", async (props) => {
  const { payload, callback } = props;
  try {
    const response = await API_REQUEST({
      url: createBlogAPI,
      method: "POST",
      data: payload,
    });
    callback(response);
    return response;
  } catch (error) {
    callback(null, error);
  }
});

export const updateBlog = createAsyncThunk("update-blog", async (props) => {
  const { payload, callback } = props;
  try {
    const response = await API_REQUEST({
      url: updateBlogAPI,
      method: "POST",
      data: payload,
    });
    callback(response);
    return response;
  } catch (error) {
    callback(null, error);
  }
});

export const kycDeatil = createAsyncThunk("kyc-detail", async (props) => {
  const { payload } = props;
  try {
    const response = await API_REQUEST({
      url: kycDeatilAPI,
      method: "GET",
      params: payload,
    });
    return response;
  } catch (error) {}
});
