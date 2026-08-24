import { startTransition, StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import { HydratedRouter } from "react-router/dom";

startTransition(() => {
  hydrateRoot(
    document,
    <StrictMode>
      <HydratedRouter />
    </StrictMode>
  );
});

if (typeof window !== "undefined") {
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    // Unregister service workers on localhost to prevent dev server caching issues
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister().then((success) => {
            if (success) console.log("Successfully unregistered SW on localhost");
          });
        }
      });
    }
    // Clear caches on localhost
    if ("caches" in window) {
      caches.keys().then((keys) => {
        keys.forEach((key) => caches.delete(key));
      });
    }
  } else if ("serviceWorker" in navigator) {
    const registerSW = () => {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((reg) => {
          console.log("PWA Service Worker registered successfully with scope:", reg.scope);
        })
        .catch((err) => {
          console.error("PWA Service Worker registration failed:", err);
        });
    };

    if (document.readyState === "complete") {
      registerSW();
    } else {
      window.addEventListener("load", registerSW);
    }
  }
}
