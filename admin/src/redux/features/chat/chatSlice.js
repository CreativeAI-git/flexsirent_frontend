import { createSlice } from "@reduxjs/toolkit";
import {
  connectChatSocket,
  disconnectChatSocket,
  fetchChatHistory,
} from "./chatThunks";

const defaultAvatar = "/user_profile.png";

const createInitialScopeState = () => ({
  isConnecting: false,
  isConnected: false,
  isLoadingHistory: false,
  error: "",
  searchTerm: "",
  isNewChat: false,
  roomId: "global",
  currentUser: null,
  conversations: [],
  availableUsers: [],
  selectedConversationId: "",
  selectedConversationType: "",
  messagesByConversation: {},
});

const getConversationKey = (id, type) => `${id}__${type}`;

const mapConversation = (item = {}) => ({
  id: item.id,
  type: item.type,
  key: getConversationKey(item.id, item.type),
  name: item.name || "User",
  role: item.type || "user",
  avatar: item.profile_image || defaultAvatar,
  unreadCount: Number(item.unread || 0),
  lastMessage: item.last_message || item.message || "",
  lastMessageAt:
    item.last_message_time ||
    item.last_message_at ||
    item.updated_at ||
    item.created_at ||
    item.timestamp ||
    item.date ||
    null,
  online: true,
});

const mapAvailableUser = (item = {}) => ({
  id: item.id,
  type: item.type,
  key: getConversationKey(item.id, item.type),
  name: item.name || "User",
  role: item.type || "user",
  avatar: item.profile_image || defaultAvatar,
  unreadCount: 0,
  lastMessage: "",
  online: true,
});

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    byScope: {
      admin: createInitialScopeState(),
    },
  },
  reducers: {
    initializeChatScope: (state, action) => {
      const { scope, roomId = "global" } = action.payload;
      if (!state.byScope[scope]) {
        state.byScope[scope] = createInitialScopeState();
      }
      state.byScope[scope].roomId = roomId;
    },
    setConnectedUser: (state, action) => {
      const { scope, user } = action.payload;
      if (!state.byScope[scope]) {
        state.byScope[scope] = createInitialScopeState();
      }
      state.byScope[scope].currentUser = user || null;
    },
    setChatList: (state, action) => {
      const { scope, list = [] } = action.payload;
      if (!state.byScope[scope]) {
        state.byScope[scope] = createInitialScopeState();
      }

      state.byScope[scope].conversations = list.map(mapConversation);
      const hasSelectedConversation = state.byScope[scope].conversations.some(
        (item) =>
          item.id === state.byScope[scope].selectedConversationId &&
          item.type === state.byScope[scope].selectedConversationType,
      );

      if (!hasSelectedConversation) {
        state.byScope[scope].selectedConversationId = "";
        state.byScope[scope].selectedConversationType = "";
      }
    },
    setAvailableUsers: (state, action) => {
      const { scope, list = [] } = action.payload;
      if (!state.byScope[scope]) {
        state.byScope[scope] = createInitialScopeState();
      }
      state.byScope[scope].availableUsers = list.map(mapAvailableUser);
    },
    setChatHistory: (state, action) => {
      const {
        scope,
        conversationId,
        conversationType,
        messages = [],
      } = action.payload;

      if (!state.byScope[scope]) {
        state.byScope[scope] = createInitialScopeState();
      }

      const key = getConversationKey(conversationId, conversationType);
      state.byScope[scope].messagesByConversation[key] = Array.isArray(messages)
        ? messages
        : [];
    },
    appendMessageToConversation: (state, action) => {
      const { scope, conversationId, conversationType, message } = action.payload;

      if (!state.byScope[scope]) {
        state.byScope[scope] = createInitialScopeState();
      }

      const key = getConversationKey(conversationId, conversationType);
      if (!state.byScope[scope].messagesByConversation[key]) {
        state.byScope[scope].messagesByConversation[key] = [];
      }

      state.byScope[scope].messagesByConversation[key].push(message);
    },
    setChatSearchTerm: (state, action) => {
      const { scope, value } = action.payload;
      if (!state.byScope[scope]) {
        state.byScope[scope] = createInitialScopeState();
      }
      state.byScope[scope].searchTerm = value;
    },
    toggleNewChatMode: (state, action) => {
      const { scope, value } = action.payload;
      if (!state.byScope[scope]) {
        state.byScope[scope] = createInitialScopeState();
      }
      state.byScope[scope].isNewChat =
        typeof value === "boolean"
          ? value
          : !state.byScope[scope].isNewChat;
    },
    selectConversation: (state, action) => {
      const { scope, conversationId, conversationType } = action.payload;
      if (!state.byScope[scope]) {
        state.byScope[scope] = createInitialScopeState();
      }

      state.byScope[scope].selectedConversationId = conversationId;
      state.byScope[scope].selectedConversationType = conversationType;
      state.byScope[scope].isNewChat = false;

      const selected = state.byScope[scope].conversations.find(
        (item) => item.id === conversationId && item.type === conversationType,
      );
      if (selected) selected.unreadCount = 0;
    },
    clearChatScope: (state, action) => {
      const { scope } = action.payload;
      state.byScope[scope] = createInitialScopeState();
    },
  },
  extraReducers: (builder) => {
    builder.addCase(connectChatSocket.pending, (state, action) => {
      const scope = action.meta.arg.scope;
      if (!state.byScope[scope]) {
        state.byScope[scope] = createInitialScopeState();
      }
      state.byScope[scope].isConnecting = true;
      state.byScope[scope].error = "";
    });

    builder.addCase(connectChatSocket.fulfilled, (state, action) => {
      const { scope } = action.payload;
      if (!state.byScope[scope]) {
        state.byScope[scope] = createInitialScopeState();
      }
      state.byScope[scope].isConnecting = false;
      state.byScope[scope].isConnected = true;
    });

    builder.addCase(connectChatSocket.rejected, (state, action) => {
      const scope = action.meta.arg.scope;
      if (!state.byScope[scope]) {
        state.byScope[scope] = createInitialScopeState();
      }
      state.byScope[scope].isConnecting = false;
      state.byScope[scope].isConnected = false;
      state.byScope[scope].error =
        action.payload || action.error.message || "Unable to connect chat";
    });

    builder.addCase(disconnectChatSocket.fulfilled, (state, action) => {
      const { scope } = action.payload;
      if (!state.byScope[scope]) {
        state.byScope[scope] = createInitialScopeState();
      }
      state.byScope[scope].isConnected = false;
      state.byScope[scope].isConnecting = false;
    });

    builder.addCase(fetchChatHistory.pending, (state, action) => {
      const scope = action.meta.arg.scope;
      if (!state.byScope[scope]) {
        state.byScope[scope] = createInitialScopeState();
      }
      state.byScope[scope].isLoadingHistory = true;
    });

    builder.addCase(fetchChatHistory.fulfilled, (state, action) => {
      const { scope } = action.payload;
      if (!state.byScope[scope]) {
        state.byScope[scope] = createInitialScopeState();
      }
      state.byScope[scope].isLoadingHistory = false;
    });

    builder.addCase(fetchChatHistory.rejected, (state, action) => {
      const scope = action.meta.arg.scope;
      if (!state.byScope[scope]) {
        state.byScope[scope] = createInitialScopeState();
      }
      state.byScope[scope].isLoadingHistory = false;
    });
  },
});

export const {
  setChatList,
  setChatHistory,
  clearChatScope,
  setConnectedUser,
  setAvailableUsers,
  setChatSearchTerm,
  toggleNewChatMode,
  selectConversation,
  initializeChatScope,
  appendMessageToConversation,
} = chatSlice.actions;

export default chatSlice.reducer;
