import { createSlice } from "@reduxjs/toolkit";
import {
  fetchSubAdmins,
  createSubAdmin,
  subAdminStatusUpdate,
  updateSubAdmin,
  fetchCardData,
  fetchSubAdminPermissions,
} from "../actions/subAdminAction";

const initialStates = {
  hostLoading: false,
  cardDetails: {},
  tableHeader: ["S.No", "Name", "Email", "Mobile Number", "Status", "Actions"],
  list: [
    {
      name: "Ayesha Sharma",
      email: "willie.jennings@example.com",
      role: "Content Manager",
      level: "Blog, Reviews",
      last_active: "2 hours ago",
      status: true,
    },
    {
      name: "Ayesha Sharma",
      email: "willie.jennings@example.com",
      role: "Content Manager",
      level: "Blog, Reviews",
      last_active: "2 hours ago",
      status: false,
    },
    {
      name: "Ayesha Sharma",
      email: "willie.jennings@example.com",
      role: "Content Manager",
      level: "Blog, Reviews",
      last_active: "2 hours ago",
      status: true,
    },
  ],
};

const subAdminSlice = createSlice({
  name: "user",
  initialState: initialStates,
  reducers: {},
  extraReducers: (builder) => {
    // properties
    builder.addCase(fetchSubAdmins.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSubAdmins.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.list = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchSubAdmins.rejected, (state, action) => {
      state.isLoading = false;
    });
    // sub-admin-permissions
    builder.addCase(fetchSubAdminPermissions.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchSubAdminPermissions.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.permissionList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchSubAdminPermissions.rejected, (state, action) => {
      state.isLoading = false;
    });
    // create-sub-admin
    builder.addCase(createSubAdmin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createSubAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createSubAdmin.rejected, (state, action) => {
      state.isLoading = false;
    });
    // update-sub-admin
    builder.addCase(updateSubAdmin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateSubAdmin.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateSubAdmin.rejected, (state, action) => {
      state.isLoading = false;
    });
    // sub-admin-status-update
    builder.addCase(subAdminStatusUpdate.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(subAdminStatusUpdate.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(subAdminStatusUpdate.rejected, (state, action) => {
      state.isLoading = false;
    });
    // card-data
    builder.addCase(fetchCardData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCardData.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.cardDetails = data || {};
      state.isLoading = false;
    });
    builder.addCase(fetchCardData.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default subAdminSlice.reducer;
