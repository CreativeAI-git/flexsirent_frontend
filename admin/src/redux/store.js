
import { configureStore } from "@reduxjs/toolkit";
import authReducers from "./reducers/authReducers";
import userReducers from "./reducers/userReducers";
import hostReducers from "./reducers/hostReducers";
import businessReducers from "./reducers/businessReducers";
import subAdminReducers from "./reducers/subAdminReducers";
import supportReducers from "./reducers/supportReducers";
import serviceFeeReducers from "./reducers/serviceFeeReducers";
import { chatReducer } from "./features/chat";

export const store = configureStore({
    reducer: {
        authReducers,
        userReducers,
        hostReducers,
        subAdminReducers,
        businessReducers,
        supportReducers,
        serviceFeeReducers,
        chat: chatReducer
    },
});
