importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js",
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
      icon: notification.icon || data.icon || "https://app.flexsirent.com/admin/assets/img/fav_icon.svg",
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

  const targetUrl = event.notification?.data?.link || "/";
  event.waitUntil(clients.openWindow(targetUrl));
});

// ==========================================
// PWA App Shell Caching Integration
// ==========================================

const CACHE_NAME = "flexsirent-pwa-shell-v1";

// Critical assets to pre-cache on install
const PRECACHE_ASSETS = [
  "/",
  "/manifest.json",
  "/favicon.ico",
  "/logo192.png",
  "/logo512.png"
];

// Install Event: pre-cache critical shell assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[PWA SW] Pre-caching app shell assets");
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: clean up old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("[PWA SW] Clearing old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: intercept network requests
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // 1. Exclude localhost, dynamic API calls, authentication requests, or hot-reloading dev sockets
  if (
    url.hostname === "localhost" ||
    url.hostname === "127.0.0.1" ||
    url.pathname.startsWith("/api/") ||
    url.pathname.includes("/ai/") ||
    url.origin !== self.location.origin ||
    event.request.method !== "GET" ||
    url.pathname.includes("hot-update") ||
    url.pathname.includes("@vite")
  ) {
    return; // Fall back entirely to the network
  }

  // 2. Navigation requests (HTML pages): Network-First, fall back to cached `/` shell
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          console.log("[PWA SW] Offline: Serving cached App Shell for", url.pathname);
          return caches.match("/");
        })
    );
    return;
  }

  // 3. Static assets (JS, CSS, images, fonts, icons): Cache-First
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        // Cache successful static responses dynamically
        if (
          networkResponse &&
          networkResponse.status === 200 &&
          (url.pathname.includes("/assets/") ||
           url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff|woff2|ico)$/))
        ) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
    })
  );
});
