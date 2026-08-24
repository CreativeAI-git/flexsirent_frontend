import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  fetchBusinessRegistrationTypes,
  fetchDocTypes,
  fetchGovernmentIdTypes,
  fetchProofOfAddressTypes,
  fetchUsers,
  getUserKYCDocumentData,
  updateKycDoc,
  updateUser,
  updateUserBlockStatus,
} from "../actions/managementAction";
const initialStates = {
  isLoading: false,
  statusOpt: [
    { value: "", label: "All" },
    { value: "Invited", label: "Invited" },
    { value: "Active", label: "Active" },
    { value: "Rejected", label: "Rejected" },
  ],
  dayOpt: [
    { value: "", label: "All" },
    { value: "By Latest", label: "By Latest" },
  ],
  starOpt: [
    { value: "", label: "All" },
    { value: "5 Star", label: "5 Star" },
    { value: "4 Star", label: "4 Star" },
    { value: "3 Star", label: "3 Star" },
    { value: "2 Star", label: "2 Star" },
    { value: "1 Star", label: "1 Star" },
  ],
  dayOpt1: [
    { value: "", label: "All" },
    { value: "Last 7 days", label: "Last 7 days" },
  ],
  tableHeader: [
    "S.No.",
    "First Name",
    "Last Name",
    "Email",
    "Allowed Booking Count (monthly)",
    "Joined On",
    "Block Status",
    "Action",
  ],
  reviewsHeader: [
    "S.No.",
    "Host",
    "Guest",
    "Property Name",
    "Rating",
    "Date",
    "Review",
    "Action",
  ],
  headers: {
    guestToHost: ["S.No", "Guest", "Host", "Message", "Date", "Action"],
    hostToBusiness: ["S.No", "Host", "Business", "Message", "Date", "Action"],
  },
  inboxList: {
    guestToHost: [
      {
        guest: "Emily Clark",
        host: "Jane Cooper",
        message: "	Hi, is early check-in poss..",
        date: "20 August, 2024",
      },
      {
        guest: "Emily Clark",
        host: "Jane Cooper",
        message: "	Hi, is early check-in poss..",
        date: "20 August, 2024",
      },
    ],
    hostToBusiness: [
      {
        host: "Emily Clark",
        business: "robert@mailinator.com",
        message: "Hi, is early check-in possi..",
        date: "20 August, 2024",
      },
      {
        host: "Emily Clark",
        business: "robert@mailinator.com",
        message: "Hi, is early check-in possi..",
        date: "20 August, 2024",
      },
    ],
  },
  managementList: [],
  reviewsList: [
    {
      host: "Robert Decosta",
      guest: "Emily Clark",
      property_title: "Modern Downtown",
      rating: "5 star",
      date: "20 August, 2024",
      review: "Great location, just.....",
    },
    {
      host: "Robert Decosta",
      guest: "Emily Clark",
      property_title: "Modern Downtown",
      rating: "5 star",
      date: "20 August, 2024",
      review: "Great location, just.....",
    },
    {
      host: "Robert Decosta",
      guest: "Emily Clark",
      property_title: "Modern Downtown",
      rating: "5 star",
      date: "20 August, 2024",
      review: "Great location, just.....",
    },
  ],
  docTypesList: [],
  getUserkycData: [],
  businessRegistrationList: [],
  govIssueIdList: [],
  proofOfAddressList: [],
};

const bookingSlice = createSlice({
  name: "booking",
  initialState: initialStates,
  reducers: {},
  extraReducers: (builder) => {
    // fetch-doc-types
    builder.addCase(fetchDocTypes.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchDocTypes.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.docTypesList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchDocTypes.rejected, (state, action) => {
      state.isLoading = false;
    });
    // update-kyc
    builder.addCase(updateKycDoc.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateKycDoc.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateKycDoc.rejected, (state, action) => {
      state.isLoading = false;
    });

    // getUserKYCDocumentData
    builder.addCase(getUserKYCDocumentData.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getUserKYCDocumentData.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.getUserkycData = data || [];
      state.isLoading = false;
    });
    builder.addCase(getUserKYCDocumentData.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetch-business-registration-types
    builder.addCase(fetchBusinessRegistrationTypes.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(
      fetchBusinessRegistrationTypes.fulfilled,
      (state, action) => {
        const { data } = action?.payload ?? {};
        state.businessRegistrationList = data || [];
        state.isLoading = false;
      }
    );
    builder.addCase(
      fetchBusinessRegistrationTypes.rejected,
      (state, action) => {
        state.isLoading = false;
      }
    );

    // fetchProofOfAddressTypes
    builder.addCase(fetchProofOfAddressTypes.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProofOfAddressTypes.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.proofOfAddressList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchProofOfAddressTypes.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetchGovernmentIdTypes
    builder.addCase(fetchGovernmentIdTypes.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchGovernmentIdTypes.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.govIssueIdList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchGovernmentIdTypes.rejected, (state, action) => {
      state.isLoading = false;
    });

    // fetch-guest-business-users
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      const { data } = action?.payload ?? {};
      state.managementList = data || [];
      state.isLoading = false;
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.isLoading = false;
    });
    // create-user
    builder.addCase(createUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.isLoading = false;
    });
    // update-user
    builder.addCase(updateUser.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isLoading = false;
    });
    // update-user-block-status
    builder.addCase(updateUserBlockStatus.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(updateUserBlockStatus.fulfilled, (state, action) => {
      state.isLoading = false;
    });
    builder.addCase(updateUserBlockStatus.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default bookingSlice.reducer;
