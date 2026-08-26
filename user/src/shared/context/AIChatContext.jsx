import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useLocalRuntime, AssistantRuntimeProvider } from "@assistant-ui/react";
import { fetchSearchTurn } from "../services/aiService";

const AIChatContext = createContext(null);

function generateUUID() {
  if (typeof window !== "undefined" && window.crypto && window.crypto.randomUUID) {
    return window.crypto.randomUUID();
  }
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const AIChatProvider = ({ children }) => {
  const { lang, listing_id } = useParams();
  const locale = lang || "en";

  // Track the current listing ID dynamically to know if user is on a listing page
  const listingIdRef = useRef(listing_id);
  useEffect(() => {
    listingIdRef.current = listing_id;
  }, [listing_id]);

  // Keep track of pending structured intent submission (e.g. from NEED_INFO structured form)
  const pendingIntentRef = useRef({});

  // Keep track of accumulated intent locally to prevent loss of fields when server returns nulls in NEED_INFO
  const [accumulatedIntent, setAccumulatedIntent] = useState({
    city: null,
    start_date: null,
    duration_days: null,
    unit_type: null
  });

  // Persistent search session ID
  const [sessionId, setSessionId] = useState(() => {
    if (typeof window !== "undefined") {
      let id = localStorage.getItem("ai_session_id") || sessionStorage.getItem("ai_session_id");
      if (!id || !id.startsWith("web:")) {
        id = `web:${generateUUID()}`;
      }
      localStorage.setItem("ai_session_id", id);
      sessionStorage.setItem("ai_session_id", id);
      return id;
    }
    return `web:flexsi-session`;
  });

  // Keep track if user made a first search (only using sessionStorage so it resets on page reload)
  const [hasSearched, setHasSearched] = useState(() => {
    if (typeof window !== "undefined") {
      return sessionStorage.getItem("ai_has_searched") === "true";
    }
    return false;
  });

  // Track if more results are available from the AI search turn API
  const [moreAvailable, setMoreAvailable] = useState(true);

  // Minimize state of floating chat
  const [isMinimized, setIsMinimized] = useState(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("ai_chat_minimized") === "true") || (sessionStorage.getItem("ai_chat_minimized") === "true");
    }
    return false;
  });

  // Expose a unified message sender that attaches potential structured intent
  const sendMessage = (text, intent = {}) => {
    if (!text || !text.trim() || runtime.thread.isRunning) return;

    pendingIntentRef.current = intent;
    runtime.thread.append({
      role: "user",
      content: [{ type: "text", text: text.trim() }]
    });
  };

  // Custom Local Runtime configuration
  const runtime = useLocalRuntime({
    async run({ messages, abortSignal }) {
      const lastMessage = messages[messages.length - 1];
      const userText = lastMessage.content?.[0]?.text || "";

      if (!userText.trim()) {
        return {
          content: []
        };
      }

      // Intercept "more options" query if no more are available
      const isMoreOptionsQuery = /^(more\s*options|more|show\s*more|mas\s*opciones|más\s*opciones|ver\s*mas|ver\s*más)$/i.test(userText.trim());
      if (isMoreOptionsQuery && !moreAvailable) {
        return {
          content: [
            {
              type: "text",
              text: locale === "es"
                ? "No hay más opciones disponibles para esta búsqueda. Te sugerimos ajustar tus criterios de búsqueda."
                : "There are no further options for this search. We suggest adjusting your search criteria instead."
            }
          ]
        };
      }

      const formIntent = pendingIntentRef.current || {};
      pendingIntentRef.current = {}; // reset after consumption

      // Extract client-side intent fields from user message to keep accumulator synced
      const textParsedIntent = {};
      const lower = userText.toLowerCase();

      // Extract city (e.g. "in madrid", "en malaga", "to barcelona")
      const cityMatch = lower.match(/(?:in|en|at|a|to|para)\s+([a-zA-Z\u00C0-\u017F\s]+?)(?=\s+(?:from|since|starting|for|during|days|months|room|apartment|desde|por|durante|dias|meses|habitacion|apartamento|$))/);
      if (cityMatch && cityMatch[1].trim()) {
        const city = cityMatch[1].trim();
        if (!["the", "a", "an", "room", "apartment", "el", "la", "un", "una", "desde", "hasta"].includes(city.toLowerCase())) {
          textParsedIntent.city = city.charAt(0).toUpperCase() + city.slice(1);
        }
      }

      // Extract duration
      const durationMonthsMatch = lower.match(/(\d+)\s*(?:month|mes|meses|months)/);
      if (durationMonthsMatch) {
        textParsedIntent.duration_days = parseInt(durationMonthsMatch[1], 10) * 30;
      }
      const durationDaysMatch = lower.match(/(\d+)\s*(?:day|days|día|dias)/);
      if (durationDaysMatch && !textParsedIntent.duration_days) {
        textParsedIntent.duration_days = parseInt(durationDaysMatch[1], 10);
      }

      // Extract unit type
      if (/\b(?:room|habitación|habitacion|dormitorio|private room|habitación privada)\b/.test(lower)) {
        textParsedIntent.unit_type = "ROOM";
      } else if (/\b(?:apartment|apartamento|flat|piso|entire home|casa entera|apartamento entero)\b/.test(lower)) {
        textParsedIntent.unit_type = "APARTMENT";
      }

      // Extract start date (YYYY-MM-DD)
      const dateMatch = lower.match(/\b(\d{4}-\d{2}-\d{2})\b/);
      if (dateMatch) {
        textParsedIntent.start_date = dateMatch[1];
      }

      // Merge current inputs with accumulated intent
      const updatedIntent = {
        ...accumulatedIntent,
        ...formIntent,
        ...textParsedIntent
      };

      // Clean up null/undefined properties
      Object.keys(updatedIntent).forEach(key => {
        if (updatedIntent[key] === undefined) {
          updatedIntent[key] = null;
        }
      });

      try {
        const responseData = await fetchSearchTurn(
          userText,
          sessionId,
          locale,
          abortSignal,
          listingIdRef.current,
          updatedIntent
        );

        if (responseData) {
          // If server returned an intent, let it override or supplement
          const serverIntent = responseData.intent || {};
          const finalIntent = {
            ...updatedIntent,
            ...(serverIntent.city != null && { city: serverIntent.city }),
            ...(serverIntent.start_date != null && { start_date: serverIntent.start_date }),
            ...(serverIntent.duration_days != null && { duration_days: serverIntent.duration_days }),
            ...(serverIntent.unit_type != null && { unit_type: serverIntent.unit_type }),
          };
          responseData.intent = finalIntent;
          setAccumulatedIntent(finalIntent);
          
          // Set moreAvailable status!
          setMoreAvailable(responseData.more_available !== false);
        }

        return {
          content: [
            {
              type: "custom-payload",
              data: responseData
            }
          ]
        };
      } catch (error) {
        console.error("[AIChatContext] fetchSearchTurn failed:", error);
        return {
          content: [
            {
              type: "text",
              text: locale === "es"
                ? "Lo siento, ha ocurrido un error al procesar tu solicitud. Por favor inténtalo de nuevo."
                : "Sorry, an error occurred while processing your request. Please try again."
            }
          ]
        };
      }
    }
  });

  // Minimize toggle helper
  const toggleMinimize = () => {
    setIsMinimized((prev) => {
      const next = !prev;
      localStorage.setItem("ai_chat_minimized", String(next));
      sessionStorage.setItem("ai_chat_minimized", String(next));
      return next;
    });
  };

  // Trigger search from the external search box (hero/header)
  const triggerFirstSearch = (queryText) => {
    if (!queryText || !queryText.trim()) return;
    setHasSearched(true);
    sessionStorage.setItem("ai_has_searched", "true");
    setIsMinimized(false);
    localStorage.setItem("ai_chat_minimized", "false");
    sessionStorage.setItem("ai_chat_minimized", "false");
    
    sendMessage(queryText);
  };

  // Reset entire search session
  const resetChat = () => {
    if (typeof window !== "undefined") {
      const nextSessionId = `web:${generateUUID()}`;
      localStorage.setItem("ai_session_id", nextSessionId);
      sessionStorage.setItem("ai_session_id", nextSessionId);
      setSessionId(nextSessionId);

      // Reset the assistant-ui runtime thread!
      runtime.thread.reset();

      // Reset accumulated intent
      setAccumulatedIntent({
        city: null,
        start_date: null,
        duration_days: null,
        unit_type: null
      });

      // Keep hasSearched as true so the floating chat stays open
      setHasSearched(true);
      sessionStorage.setItem("ai_has_searched", "true");

      setIsMinimized(false);
      localStorage.setItem("ai_chat_minimized", "false");
      sessionStorage.setItem("ai_chat_minimized", "false");

      setMoreAvailable(true);
    }
  };

  return (
    <AIChatContext.Provider
      value={{
        sessionId,
        hasSearched,
        isMinimized,
        moreAvailable,
        runtime,
        toggleMinimize,
        triggerFirstSearch,
        resetChat,
        locale,
        sendMessage
      }}
    >
      <AssistantRuntimeProvider runtime={runtime}>
        {children}
      </AssistantRuntimeProvider>
    </AIChatContext.Provider>
  );
};

export const useAIChat = () => {
  const context = useContext(AIChatContext);
  if (!context) {
    throw new Error("useAIChat must be used within an AIChatProvider");
  }
  return context;
};
