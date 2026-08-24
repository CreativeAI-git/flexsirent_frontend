import { useEffect } from "react";
import { Outlet, useParams, redirect } from "react-router";
import i18n from "../i18n";
import { AIChatProvider } from "../shared/context/AIChatContext";
import FloatingChat from "../components/FloatingChat";

const SUPPORTED_LOCALES = [
  "en", "es", "sv", "fr", "de", "it", "nl", "no", "da", "fi", "pt", "pl",
  "tr", "ru", "zh", "ja", "ko", "ar", "hi", "el", "he", "cs"
];

const KNOWN_PAGES = [
  "become-a-host",
  "properties",
  "l",
  "blogs",
  "blog-details",
  "help",
  "terms-and-condotions",
  "privacy-policy",
  "cancellation-policy",
  "marketing",
  "ai-search",
  "appartments",
  "guest",
  "host"
];

export function loader({ params, request }) {
  const { lang } = params;
  if (!SUPPORTED_LOCALES.includes(lang)) {
    const url = new URL(request.url);
    const segments = url.pathname.split("/").filter(Boolean);

    if (segments.length > 0) {
      if (KNOWN_PAGES.includes(segments[0])) {
        // No language prefix present, prepend "en"
        segments.unshift("en");
      } else {
        // Invalid language prefix present, replace it with "en"
        segments[0] = "en";
      }
    } else {
      segments.push("en");
    }

    const newPathname = "/" + segments.join("/");
    return redirect(newPathname + url.search);
  }
  return null;
}

export default function LangLayout() {
  const { lang } = useParams();

  // Handle server-side initialization
  if (lang && i18n.language !== lang && SUPPORTED_LOCALES.includes(lang)) {
    i18n.changeLanguage(lang);
  }

  // Handle client-side updates
  useEffect(() => {
    if (lang && i18n.language !== lang && SUPPORTED_LOCALES.includes(lang)) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <AIChatProvider>
      <Outlet />
      <FloatingChat />
    </AIChatProvider>
  );
}

