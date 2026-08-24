import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  appendMessageToConversation,
  setAvailableUsers,
  setChatHistory,
  setChatList,
  setConnectedUser,
} from "./chatSlice";
import {
  connectScopeSocket,
  disconnectScopeSocket,
  getScopeSocket,
  requestChatHistory,
  requestChatList,
  requestAvailableUsers,
  requestStartChat,
  sendSocketMessage,
} from "../../../shared/modules/chat/socketService";

export const connectChatSocket = createAsyncThunk(
  "chat/connectSocket",
  async (payload, { dispatch, getState, rejectWithValue }) => {
    try {
      const { scope, token, socketUrl } = payload;

      connectScopeSocket(scope, {
        token,
        socketUrl,
        onConnect: () => {
          requestChatList(scope);
        },
        onConnectedUser: (user) => {
          dispatch(setConnectedUser({ scope, user }));
        },
        onChatList: (list) => {
          dispatch(setChatList({ scope, list }));
        },
        onAvailableUsers: (list) => {
          dispatch(setAvailableUsers({ scope, list }));
        },
        onChatHistory: (messages) => {
          const scopeState = getState()?.chat?.byScope?.[scope] || {};
          dispatch(
            setChatHistory({
              scope,
              conversationId: scopeState.selectedConversationId,
              conversationType: scopeState.selectedConversationType,
              messages,
            })
          );
        },
        onMessageSent: (data) => {
          const scopeState = getState()?.chat?.byScope?.[scope] || {};
          if (!scopeState.selectedConversationId || !scopeState.selectedConversationType) {
            return;
          }

          const normalized = {
            sender_id: scopeState.currentUser?.id,
            sender_type: scopeState.currentUser?.type,
            message: data?.message || "",
            ...data,
          };

          dispatch(
            appendMessageToConversation({
              scope,
              conversationId: scopeState.selectedConversationId,
              conversationType: scopeState.selectedConversationType,
              message: normalized,
            })
          );

          requestChatList(scope);
        },
        onReceiveMessage: (data) => {
          const scopeState = getState()?.chat?.byScope?.[scope] || {};
          const isActiveChat =
            scopeState.selectedConversationId === data?.sender_id &&
            scopeState.selectedConversationType === data?.sender_type;

          if (isActiveChat) {
            dispatch(
              appendMessageToConversation({
                scope,
                conversationId: data?.sender_id,
                conversationType: data?.sender_type,
                message: data,
              })
            );
          } else {
            requestChatList(scope);
          }
        },
      });

      return { scope };
    } catch (error) {
      return rejectWithValue(error?.message || "socket-connection-failed");
    }
  }
);

export const disconnectChatSocket = createAsyncThunk(
  "chat/disconnectSocket",
  async ({ scope }) => {
    disconnectScopeSocket(scope);
    return { scope };
  }
);

export const fetchChatHistory = createAsyncThunk(
  "chat/fetchHistory",
  async ({ scope, receiverId, receiverType }, { rejectWithValue }) => {
    try {
      requestChatHistory(scope, {
        receiver_id: receiverId,
        receiver_type: receiverType,
      });
      return { scope };
    } catch (error) {
      return rejectWithValue(error?.message || "chat-history-failed");
    }
  }
);

export const sendChatMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ scope, receiverId, receiverType, message }, { rejectWithValue }) => {
    try {
      sendSocketMessage(scope, {
        receiver_id: receiverId,
        receiver_type: receiverType,
        message,
      });
      return { scope };
    } catch (error) {
      return rejectWithValue(error?.message || "chat-send-failed");
    }
  }
);

export const fetchAvailableUsers = createAsyncThunk(
  "chat/fetchAvailableUsers",
  async ({ scope }, { rejectWithValue }) => {
    try {
      requestAvailableUsers(scope);
      return { scope };
    } catch (error) {
      return rejectWithValue(error?.message || "chat-available-users-failed");
    }
  }
);

export const startChatConversation = createAsyncThunk(
  "chat/startConversation",
  async ({ scope, receiverId, receiverType }, { rejectWithValue }) => {
    try {
      requestStartChat(scope, {
        receiver_id: receiverId,
        receiver_type: receiverType,
      });
      return { scope };
    } catch (error) {
      return rejectWithValue(error?.message || "chat-start-failed");
    }
  }
);

export const refreshChatList = createAsyncThunk(
  "chat/refreshList",
  async ({ scope }, { rejectWithValue }) => {
    try {
      const socket = getScopeSocket(scope);
      if (socket?.connected) {
        requestChatList(scope);
      }
      return { scope };
    } catch (error) {
      return rejectWithValue(error?.message || "chat-list-refresh-failed");
    }
  }
);
