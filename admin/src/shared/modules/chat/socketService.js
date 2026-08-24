import { io } from "socket.io-client";
import { SOCKET_URL } from "../../../routes/BackendRouts";

const scopeSockets = {};

export const connectScopeSocket = (scope, options = {}) => {
  const {
    token,
    socketUrl,
    onConnect,
    onConnectedUser,
    onChatList,
    onChatHistory,
    onMessageSent,
    onReceiveMessage,
    onAvailableUsers,
    onDisconnect,
    onError,
  } = options;

  if (scopeSockets[scope]) {
    return scopeSockets[scope];
  }

  const socket = io(socketUrl || SOCKET_URL, {
    query: { token: token || "" },
    transports: ["websocket"],
  });

  socket.on("connect", () => {
    if (typeof onConnect === "function") onConnect();
  });

  socket.on("connected_user", (user) => {
    if (typeof onConnectedUser === "function") onConnectedUser(user);
  });

  socket.on("chat_list", (list) => {
    if (typeof onChatList === "function") onChatList(list);
  });

  socket.on("chat_history", (messages) => {
    if (typeof onChatHistory === "function") onChatHistory(messages);
  });

  socket.on("message_sent", (data) => {
    if (typeof onMessageSent === "function") onMessageSent(data);
  });

  socket.on("receive_message", (data) => {
    if (typeof onReceiveMessage === "function") onReceiveMessage(data);
  });

  socket.on("available_users", (list) => {
    if (typeof onAvailableUsers === "function") onAvailableUsers(list);
  });

  socket.on("get_available_users", (list) => {
    if (typeof onAvailableUsers === "function") onAvailableUsers(list);
  });

  socket.on("disconnect", (reason) => {
    if (typeof onDisconnect === "function") onDisconnect(reason);
  });

  socket.on("connect_error", (error) => {
    if (typeof onError === "function") onError(error);
  });

  scopeSockets[scope] = socket;
  return socket;
};

export const getScopeSocket = (scope) => scopeSockets[scope];

export const disconnectScopeSocket = (scope) => {
  const socket = scopeSockets[scope];
  if (!socket) return;

  socket.disconnect();
  delete scopeSockets[scope];
};

export const requestChatList = (scope) => {
  const socket = scopeSockets[scope];
  if (!socket) return;
  socket.emit("get_chat_list");
};

export const requestChatHistory = (scope, payload) => {
  const socket = scopeSockets[scope];
  if (!socket) return;
  socket.emit("get_messages", payload);
};

export const requestAvailableUsers = (scope) => {
  const socket = scopeSockets[scope];
  if (!socket) return;
  socket.emit("get_available_users");
};

export const requestStartChat = (scope, payload) => {
  const socket = scopeSockets[scope];
  if (!socket) return;
  socket.emit("start_chat", payload);
};

export const sendSocketMessage = (scope, payload) => {
  const socket = scopeSockets[scope];
  if (!socket) return;
  socket.emit("send_message", payload);
};
