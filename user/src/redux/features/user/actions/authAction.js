import { API_REQUEST } from "../..";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  setPermissions,
  setToken,
} from "../../../../shared/utils/pip";
import {
  signupAPI,
  signinAPI,
  userProfileAPI,
  userPasswordChangeAPI,
  updateUserProfileAPI,
  forgotPassAPI,
  getPolicyDataAPI,
  blogsAPI,
  contactUsAPI,
} from "../../../../shared/routes/apiURLs";

// auth-signup
export const authSignup = createAsyncThunk("auth-signup", async (props) => {
  const { payload, callback } = props;
  try {
    const response = await API_REQUEST({
      url: signupAPI,
      method: "POST",
      data: payload,
    });
    callback(response);
    return response;
  } catch (error) {
    callback(null, error);
  }
});

// auth-signin
export const authSignin = createAsyncThunk("auth-signin", async (props) => {
  const { payload, callback, panel } = props;

  // Normalize camelCase panel names to kebab-case
  // so token keys match PANEL_ORDER = ["host-business", "guest-business", "host", "guest"]
  const normalizePanel = (p) => {
    if (p === "hostBusiness") return "host-business";
    if (p === "guestBusiness") return "guest-business";
    return p;
  };
  const normalizedPanel = normalizePanel(panel);

  try {
    const response = await API_REQUEST({
      url: signinAPI,
      method: "POST",
      data: payload,
    });

    if (response?.success) {
      if (response?.data?.user_type == 1) {
        setToken(normalizedPanel, response?.data?.jwt_token);
      } else if (response?.data?.user_type == 3) {
        setToken("host", response?.data?.jwt_token);
        localStorage.setItem("isSubHost","Yes")
        setPermissions(response?.data?.permission);
      } else {
          localStorage.setItem("isSubHost","No")
        setToken(`${normalizedPanel}-business`, response?.data?.jwt_token);
      }
    }
    callback(response);
    return response;
  } catch (error) {
    callback(null, error);
  }
});
// auth-forgot-password
export const authForgotPassword = createAsyncThunk(
  "auth-forgot-password",
  async (props) => {
    const { payload, callback } = props;
    try {
      const response = await API_REQUEST({
        url: forgotPassAPI,
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

// fetch-user-profile
export const fetchUserProfile = createAsyncThunk(
  "fetch-user-profile",
  async () => {
    try {
      const response = await API_REQUEST({
        url: userProfileAPI,
        method: "GET",
      });
      return response;
    } catch (error) {}
  }
);

// update-user-profile
export const updateUserProfileData = createAsyncThunk(
  "update-user-profile",
  async (props) => {
    const { payload, callback } = props;
    try {
      const response = await API_REQUEST({
        url: updateUserProfileAPI,
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

// Change-user-password
export const changeUserPassword = createAsyncThunk(
  "change-user-password",
  async (props) => {
    const { payload, callback } = props;
    try {
      const response = await API_REQUEST({
        url: userPasswordChangeAPI,
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

// Get Policy Data
export const getAllPolicyData = createAsyncThunk(
  "get-all-policy",
  async (props) => {
    const { payload } = props;
    try {
      const response = await API_REQUEST({
        url: getPolicyDataAPI + payload,
        method: "GET",
      });
      return response;
    } catch (error) {}
  }
);

// fetch-blogs
export const fetchBlogs = createAsyncThunk("fetch-blogs", async () => {
  try {
    const response = await API_REQUEST({
      url: blogsAPI,
      method: "GET",
    });
    return response;
  } catch (error) {}
});

// contact-us
export const sendQuery = createAsyncThunk("contact-us", async (props) => {
  const { payload, callback } = props;
  try {
    const response = await API_REQUEST({
      url: contactUsAPI,
      method: "POST",
      data: payload,
    });
    callback(response);
    return response;
  } catch (error) {
    callback(null, error);
  }
});
