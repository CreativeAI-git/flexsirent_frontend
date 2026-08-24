import { createSlice } from "@reduxjs/toolkit";
import { curSym, setProfile } from "../../../../shared/utils/pip";
import {
  changeHostPassword,
  createHostStripeSetup,
  createSubHost,
  fetchHostAllowPermission,
  fetchHostPermissions,
  fetchHostProfile,
  fetchSubHost,
  fetchSubHostDetails,
  updateHostProfileData,
  updateSubHost,
  updateSubHostStatus,
} from "../actions/authAction";

const initialStates = {
  isLoading: false,
  subHostHeader: [
    "S.No.",
    "First Name",
    "Last Name",
    "Email",
    "Phone Number",
    "Status",
    "Action",
  ],
  subHostList: [],
  subHostAllowPer: [],
  permissionList: [],
  subHostDetails: {},
  isSideBar: false,
};

const authSlice = createSlice({
  name: "host",
  initialState: initialStates,
  reducers: {
    toggleSideBarView: (state, action) => {
      state.isSideBar = action.payload;
    },
  },
  extraReducers: (builder) => {
    // fetch-host-profile
    builder.addCase(fetchHostProfile.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHostProfile.fulfilled, (state, action) => {
      const { data, success } = action?.payload ?? {};
      if (success) {
        setProfile("host", data);
        setProfile("hostBusiness", data);
      }
      state.isLoading = false;
    });
    builder.addCase(fetchHostProfile.rejected, (state, action) => {
      state.isLoading = false;
    });
    // fetch-host-allow-permission
    builder.addCase(fetchHostAllowPermission.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHostAllowPermission.fulfilled, (state, action) => {
      const { data, success } = action?.payload ?? {};
      state.subHostAllowPer = data || []
      state.isLoading = false;
    });
    builder.addCase(fetchHostAllowPermission.rejected, (state, action) => {
      state.isLoading = false;
    });

    // changeHostPassword
    builder.addCase(changeHostPassword.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(changeHostPassword.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(changeHostPassword.rejected, (state, action) => {
      state.isLoading = false;
    });

    // updateHostProfileData
    builder.addCase(updateHostProfileData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateHostProfileData.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateHostProfileData.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(createHostStripeSetup.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createHostStripeSetup.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createHostStripeSetup.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetch-sub-host
    builder.addCase(fetchSubHost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSubHost.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.subHostList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchSubHost.rejected, (state, action) => {
      state.isLoading = false;
    })

    // fetch-host-permissons
    builder.addCase(fetchHostPermissions.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchHostPermissions.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.permissionList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchHostPermissions.rejected, (state, action) => {
      state.isLoading = false;
    });

    // create-sub-host
    builder.addCase(createSubHost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createSubHost.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createSubHost.rejected, (state, action) => {
      state.isLoading = false;
    });

    // update-sub-host
    builder.addCase(updateSubHost.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateSubHost.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateSubHost.rejected, (state, action) => {
      state.isLoading = false;
    });
    // update-sub-host-status
    builder.addCase(updateSubHostStatus.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateSubHostStatus.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateSubHostStatus.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetch-sub-host-details
    builder.addCase(fetchSubHostDetails.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSubHostDetails.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.subHostDetails = data || {};
      state.isLoading = false;
    });
    builder.addCase(fetchSubHostDetails.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export const { toggleSideBarView } = authSlice.actions;
export default authSlice.reducer;
