import { createSlice } from "@reduxjs/toolkit";

const initialStates = {
    businessLoading: false,
    businessTableHeading: ["S.No", "Business Name", "Contact Person", "Region", "Total Users", "Block", "Action"],
    businessTableData: [
        {
            businessName: "FlexsiRent Europe GmbH",
            contact_person: "Eleanor Pena",
            region: "Germany",
            total_users: "15788",
            block: false
        },
        {
            businessName: "FlexsiRent Europe GmbH",
            contact_person: "Eleanor Pena",
            region: "Germany",
            total_users: "15788",
            block: false
        },
        {
            businessName: "FlexsiRent Europe GmbH",
            contact_person: "Eleanor Pena",
            region: "Germany",
            total_users: "15788",
            block: false
        },
        {
            businessName: "FlexsiRent Europe GmbH",
            contact_person: "Eleanor Pena",
            region: "Germany",
            total_users: "15788",
            block: false
        },
        {
            businessName: "FlexsiRent Europe GmbH",
            contact_person: "Eleanor Pena",
            region: "Germany",
            total_users: "15788",
            block: false
        },
        {
            businessName: "FlexsiRent Europe GmbH",
            contact_person: "Eleanor Pena",
            region: "Germany",
            total_users: "15788",
            block: false
        },
        {
            businessName: "FlexsiRent Europe GmbH",
            contact_person: "Eleanor Pena",
            region: "Germany",
            total_users: "15788",
            block: false
        },
        {
            businessName: "FlexsiRent Europe GmbH",
            contact_person: "Eleanor Pena",
            region: "Germany",
            total_users: "15788",
            block: false
        },
        {
            businessName: "FlexsiRent Europe GmbH",
            contact_person: "Eleanor Pena",
            region: "Germany",
            total_users: "15788",
            block: false
        },
        {
            businessName: "FlexsiRent Europe GmbH",
            contact_person: "Eleanor Pena",
            region: "Germany",
            total_users: "15788",
            block: false
        },
        {
            businessName: "FlexsiRent Europe GmbH",
            contact_person: "Eleanor Pena",
            region: "Germany",
            total_users: "15788",
            block: false
        }
    ],
    businessDetailsDashboard: [
        {
            label: "Total Properties",
            value: 180
        },
        {
            label: "Total Users",
            value: 564
        },
        {
            label: "Total Bookings",
            value: 164
        }
    ]
};

const businessSlice = createSlice({
    name: "business",
    initialState: initialStates,
    reducers: {
        
    },
    extraReducers: () => {
    }
});

export default businessSlice.reducer;