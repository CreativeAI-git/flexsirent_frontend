import { createSlice } from "@reduxjs/toolkit";
import {
  authForgotPassword,
  authSignin,
  authSignup,
  changeUserPassword,
  fetchBlogs,
  fetchUserProfile,
  getAllPolicyData,
  sendQuery,
  updateUserProfileData,
} from "../actions/authAction";
import { setProfile } from "../../../../shared/utils/pip";

const initialState = {
  isLoading: false,
  isNewChat: false,
  profileData: {},
  options: [
    { value: "2", label: "Yes" },
    { value: "1", label: "No" },
  ],
  policyData: "",
  blogList: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setIsNewChat: (state, action) => {
      state.isNewChat = action.payload
    },
  },
  extraReducers: (builder) => {
    // auth-signup
    builder.addCase(authSignup.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(authSignup.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(authSignup.rejected, (state, action) => {
      state.isLoading = false;
    });
    // auth-signin
    builder.addCase(authSignin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(authSignin.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(authSignin.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-user-profile
    builder.addCase(fetchUserProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      const { data, success } = action?.payload ?? {};
      if (success) {
        setProfile("guest", data);
        setProfile("guestBusiness", data);
      }
      state.profileData = data || {};
      state.isLoading = false;
    });
    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.isLoading = false;
    });

    // changeUserPassword
    builder.addCase(changeUserPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(changeUserPassword.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(changeUserPassword.rejected, (state, action) => {
      state.isLoading = false;
    });

    // updateUserProfileData
    builder.addCase(updateUserProfileData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserProfileData.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateUserProfileData.rejected, (state, action) => {
      state.isLoading = false;
    });
    // auth-forgot-password
    builder.addCase(authForgotPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(authForgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(authForgotPassword.rejected, (state, action) => {
      state.isLoading = false;
    });

    // getAllPolicyData
    builder.addCase(getAllPolicyData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllPolicyData.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.policyData = data || "";
      state.isLoading = false;
    });
    builder.addCase(getAllPolicyData.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetch-blogs
    builder.addCase(fetchBlogs.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.blogList = data || "";
      state.isLoading = false;
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.isLoading = false;
    });
    // contact-us
    builder.addCase(sendQuery.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(sendQuery.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(sendQuery.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const {setIsNewChat} = authSlice.actions
export default authSlice.reducer;