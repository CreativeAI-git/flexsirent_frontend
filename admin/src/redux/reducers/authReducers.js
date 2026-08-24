import { createSlice } from "@reduxjs/toolkit";
import { curSym, setProfile } from "../../utills/pip";
import {
  authChangePassword,
  authForgotPassword,
  authLogin,
  deleteAdminNotification,
  deleteBlog,
  fetchAdminNotifications,
  fetchBlogs,
  getAllKYCDocData,
  getCancellationPolicySettings,
  getPolicyData,
  kycDeatil,
  myProfile,
  updateAdminProfile,
  updateBlog,
  updateCancellationPolicySettings,
  updatePolicyData,
} from "../actions/authAction";

const initialStates = {
  isLoading: false,
  notificationLoading: false,
  isSideBar: false,
  dashboardBookingHeading: [
    "S.No.",
    "Guest",
    "Property Name",
    "Property Type",
    "Price/Month",
    "Status",
    "Action",
  ],
  bookingData: [
    {
      guest: "Maria",
      property_title: "Modern Downtown",
      property_type: "Apartment",
      price: `${curSym}2800`,
      status: "Checked-In",
    },
    {
      guest: "Maria",
      property_title: "Modern Downtown",
      property_type: "Apartment",
      price: `${curSym}2800`,
      status: "Confirmed",
    },
    {
      guest: "Maria",
      property_title: "Modern Downtown",
      property_type: "Apartment",
      price: `${curSym}2800`,
      status: "Upcoming",
    },
    {
      guest: "Maria",
      property_title: "Modern Downtown",
      property_type: "Apartment",
      price: `${curSym}2800`,
      status: "Cancelled",
    },
    {
      guest: "Maria",
      property_title: "Modern Downtown",
      property_type: "Apartment",
      price: `${curSym}2800`,
      status: "Confirmed",
    },
    {
      guest: "Maria",
      property_title: "Modern Downtown",
      property_type: "Apartment",
      price: `${curSym}2800`,
      status: "Checked-In",
    },
    {
      guest: "Maria",
      property_title: "Modern Downtown",
      property_type: "Apartment",
      price: `${curSym}2800`,
      status: "Checked-In",
    },
    {
      guest: "Maria",
      property_title: "Modern Downtown",
      property_type: "Apartment",
      price: `${curSym}2800`,
      status: "Checked-In",
    },
  ],
  notificationData: [],
  unreadNotificationCount: 0,
  isNotificationRead: false,
  blogTableHeading: ["S.No", "Image", "Title", "Description", "Action"],
  myProfileData: {},
  tableHeader: [
    "S.No.",
    "User Name",
    "Submitted On",
    "Status",
    "Actions",
  ],
  userKycData: [],
  docDetail: {},
  userBusinessKycData: [],
  blogList: [],
  policyData: "",
  cancellationPolicySettings: {
    thirty_days: "",
    ten_days: "",
    seven_days: "",
    same_day: "",
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState: initialStates,
  reducers: {
    toggleSideBarView: (state, action) => {
      state.isSideBar = action.payload;
    },
    markNotificationsRead: (state) => {
      state.isNotificationRead = true;
      state.unreadNotificationCount = 0;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(authLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(authLogin.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(authLogin.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(myProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(myProfile.fulfilled, (state, action) => {
      const { data } = action?.payload || {};
      setProfile("admin", {
        full_name: data?.full_name,
        image: data?.profile_image,
      });
      state.myProfileData = data ?? {};
      state.isLoading = false;
    });
    builder.addCase(myProfile.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(authForgotPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(authForgotPassword.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(authForgotPassword.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(authChangePassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(authChangePassword.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(authChangePassword.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(updateAdminProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateAdminProfile.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateAdminProfile.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(fetchAdminNotifications.pending, (state, action) => {
      state.notificationLoading = true;
    });
    builder.addCase(fetchAdminNotifications.fulfilled, (state, action) => {
      const { data } = action?.payload || {};
      const notifications = Array.isArray(data)
        ? data
        : data?.notifications || [];
      state.notificationData = notifications;
      state.unreadNotificationCount = state.isNotificationRead
        ? 0
        : notifications.length;
      state.notificationLoading = false;
    });
    builder.addCase(fetchAdminNotifications.rejected, (state, action) => {
      state.notificationLoading = false;
    });

    builder.addCase(deleteAdminNotification.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteAdminNotification.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteAdminNotification.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(getAllKYCDocData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getAllKYCDocData.fulfilled, (state, action) => {
      const { data } = action?.payload || {};
      state.userKycData = data?.guestDoc ?? [];
      state.userBusinessKycData = data?.guestBusinessDoc ?? [];
      state.isLoading = false;
    });
    builder.addCase(getAllKYCDocData.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(getPolicyData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getPolicyData.fulfilled, (state, action) => {
      const { data } = action?.payload || {};
      state.policyData = data ?? "";
      state.isLoading = false;
    });
    builder.addCase(getPolicyData.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(updatePolicyData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updatePolicyData.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updatePolicyData.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(getCancellationPolicySettings.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCancellationPolicySettings.fulfilled, (state, action) => {
      const { data } = action?.payload || {};
      state.cancellationPolicySettings = data || initialStates.cancellationPolicySettings;
      state.isLoading = false;
    });
    builder.addCase(getCancellationPolicySettings.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(updateCancellationPolicySettings.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateCancellationPolicySettings.fulfilled, (state, action) => {
      const { data } = action?.payload || {};
      state.cancellationPolicySettings = data || state.cancellationPolicySettings;
      state.isLoading = false;
    });
    builder.addCase(updateCancellationPolicySettings.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(fetchBlogs.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      const { data } = action?.payload || {};
      state.blogList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(deleteBlog.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(deleteBlog.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(deleteBlog.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(updateBlog.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateBlog.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateBlog.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(kycDeatil.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(kycDeatil.fulfilled, (state, action) => {
      const { data } = action?.payload || {};
      state.docDetail = data || {};
      state.isLoading = false;
    });
    builder.addCase(kycDeatil.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { toggleSideBarView, markNotificationsRead } = adminSlice.actions;
export default adminSlice.reducer;
