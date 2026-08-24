import hostReducer from "./features/host";
import guestReducer from "./features/user";
import busenessReducer from "./features/business";
import { chatReducer } from "./features/chat";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    host: hostReducer,
    guest: guestReducer,
    business: busenessReducer,
    chat: chatReducer,
  },
});
