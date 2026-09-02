importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCob6z_qGhOUol9EPLwwBL-nS72oumQ1HY",
  authDomain: "flexsirent-ec720.firebaseapp.com",
  projectId: "flexsirent-ec720",
  storageBucket: "flexsirent-ec720.firebasestorage.app",
  messagingSenderId: "918679649980",
  appId: "1:918679649980:web:25475c8274cfac4060dab9",
  measurementId: "G-W0PV7G02S6",
});

const messaging = firebase.messaging();

const buildNotification = (payload = {}) => {
  const notification = payload?.notification || {};
  const data = payload?.data || {};

  return {
    title: notification.title || data.title || "FlexsiRent",
    options: {
      body: notification.body || data.body || "You have a new message.",
      icon: notification.icon || data.icon || "/admin/assets/img/fav_icon.svg",
      image: notification.image || data.image,
      data,
    },
  };
};

const showFirebaseNotification = (payload = {}) => {
  const { title, options } = buildNotification(payload);
  return self.registration.showNotification(title, options);
};

messaging.onBackgroundMessage((payload) => {
  showFirebaseNotification(payload);
});

self.addEventListener("push", (event) => {
  if (!event.data) {
    return;
  }

  let payload = {};

  try {
    payload = event.data.json();
  } catch (error) {
    payload = {
      notification: {
        title: "FlexsiRent",
        body: event.data.text(),
      },
    };
  }

  event.waitUntil(showFirebaseNotification(payload));
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const targetUrl = event.notification?.data?.link || "/admin";
  event.waitUntil(clients.openWindow(targetUrl));
});
