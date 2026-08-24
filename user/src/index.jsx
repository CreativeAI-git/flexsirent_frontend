import "./i18n";
import "./index.css";
import App from "./App";
import React from "react";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router";
import {
  initializeForegroundMessaging,
  registerFirebaseMessagingSW,
} from "./shared/utils/firebaseUtils";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

registerFirebaseMessagingSW();
initializeForegroundMessaging();

if (typeof window !== "undefined" && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/firebase-messaging-sw.js")
      .then((reg) => {
        console.log("PWA Service Worker registered successfully with scope:", reg.scope);
      })
      .catch((err) => {
        console.error("PWA Service Worker registration failed:", err);
      });
  });
}
