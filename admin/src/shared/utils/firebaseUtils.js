import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCob6z_qGhOUol9EPLwwBL-nS72oumQ1HY",
  authDomain: "flexsirent-ec720.firebaseapp.com",
  projectId: "flexsirent-ec720",
  storageBucket: "flexsirent-ec720.firebasestorage.app",
  messagingSenderId: "918679649980",
  appId: "1:918679649980:web:25475c8274cfac4060dab9",
  measurementId: "G-W0PV7G02S6",
};

const vapidkey =
  "BGCBTXIKCS_LCslP7a1prEPsaE5h1yn7VbYY-ouT0227-IggMckBQYbu1p0uEhGV9v-bil_mKF1HfDvwneUlKtY";
const FCM_STORAGE_KEY = "admin-fcm-token";
const SW_URL = `${process.env.PUBLIC_URL}/firebase-messaging-sw.js`;

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const registerFirebaseMessagingSW = async () => {
  try {
    if (
      typeof window === "undefined" ||
      !("serviceWorker" in navigator) ||
      !window.isSecureContext
    ) {
      return null;
    }

    const existingRegistration = await navigator.serviceWorker.getRegistration(
      SW_URL
    );

    if (existingRegistration) {
      return existingRegistration;
    }

    return await navigator.serviceWorker.register(SW_URL);
  } catch (error) {
    console.error("Failed to register firebase messaging service worker.", error);
    return null;
  }
};

export const requestForToken = async () => {
  try {
    if (typeof window === "undefined" || !("Notification" in window)) {
      return null;
    }

    const permission =
      Notification.permission === "default"
        ? await Notification.requestPermission()
        : Notification.permission;

    if (permission !== "granted") {
      return null;
    }

    const registration = await registerFirebaseMessagingSW();

    if (!registration) {
      return null;
    }

    const currentToken = await getToken(messaging, {
      vapidKey: vapidkey,
      serviceWorkerRegistration: registration,
    });

    if (currentToken) {
      localStorage.setItem(FCM_STORAGE_KEY, currentToken);
      return currentToken;
    }

    return localStorage.getItem(FCM_STORAGE_KEY);
  } catch (error) {
    console.error("An error occurred while retrieving token.", error);
    return localStorage.getItem(FCM_STORAGE_KEY);
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

const getNotificationContent = (payload = {}) => {
  const notification = payload?.notification || {};
  const data = payload?.data || {};

  return {
    title: notification.title || data.title || "FlexsiRent",
    options: {
      body: notification.body || data.body || "You have a new message.",
      icon: notification.icon || data.icon || "assets/img/fav_icon.svg",
      image: notification.image || data.image,
      data,
    },
  };
};

let isForegroundListenerAttached = false;

export const initializeForegroundMessaging = async () => {
  try {
    if (
      isForegroundListenerAttached ||
      typeof window === "undefined" ||
      !("Notification" in window)
    ) {
      return;
    }

    isForegroundListenerAttached = true;

    onMessage(messaging, async (payload) => {
      if (Notification.permission !== "granted") {
        return;
      }

      const { title, options } = getNotificationContent(payload);
      new Notification(title, options);
    });
  } catch (error) {
    console.error("Failed to initialize foreground messaging.", error);
  }
};
