import { useState, useEffect, useRef } from "react";
import { useSearchParams, useParams } from "react-router";
import { fetchAiDiscovery } from "../services/aiService";

// ─────────────────────────────────────────────────────────────────────────────
// CLIENT-SIDE INTENT EXTRACTOR
// Parses natural language queries into structured intent fields.
// Reduces NEED_INFO loops by pre-filling known fields before the API call.
// ─────────────────────────────────────────────────────────────────────────────

const PURPOSE_KEYWORDS = {
  WORK:       ["work", "job", "professional", "business", "corporate", "trabajar", "trabajo"],
  STUDENT:    ["student", "study", "university", "uni", "college", "estudiante", "estudiar"],
  ERASMUS:    ["erasmus", "exchange"],
  RELOCATION: ["relocat", "moving", "mudanza", "traslado", "relocation"]
};

const MONTH_MAP = {
  january: "01", february: "02", march: "03", april: "04",
  may: "05", june: "06", july: "07", august: "08",
  september: "09", october: "10", november: "11", december: "12",
  enero: "01", febrero: "02", marzo: "03", abril: "04",
  mayo: "05", junio: "06", julio: "07", agosto: "08",
  septiembre: "09", octubre: "10", noviembre: "11", diciembre: "12",
  jan: "01", feb: "02", mar: "03", apr: "04",
  jun: "06", jul: "07", aug: "08",
  sep: "09", oct: "10", nov: "11", dec: "12"
};

/**
 * Resolve a month name to a zero-padded 2-digit string.
 */
function resolveMonth(token) {
  return MONTH_MAP[token.toLowerCase()] || null;
}

/**
 * Resolve year token — if 2-digit, prefix with 20.
 */
function resolveYear(token) {
  if (!token) return new Date().getFullYear().toString();
  const y = parseInt(token, 10);
  if (y < 100) return (2000 + y).toString();
  return token;
}

/**
 * Extract intent fields from free text.
 * Returns a partial intent object — only fills fields that can be confidently parsed.
 */
export function extractIntentFromText(text) {
  const lower = text.toLowerCase();
  const intent = {};

  // ── CITY ─────────────────────────────────────────────────────────────────
  // Patterns: "in Madrid", "en Málaga", "looking in Barcelona",
  //           "accommodation in Testville", "flat in Seville"
  // Strategy: extract the proper-noun word(s) that follow location prepositions.
  const cityPatterns = [
    // English: "in [City]", "at [City]", "near [City]"
    /\b(?:in|at|near)\s+([A-ZÁÉÍÓÚÜÑ][a-záéíóúüñA-ZÁÉÍÓÚÜÑ]+(?:[\s\-][A-ZÁÉÍÓÚÜÑ][a-záéíóúüñA-ZÁÉÍÓÚÜÑ]+)?)/,
    // Spanish: "en [Ciudad]"
    /\ben\s+([A-ZÁÉÍÓÚÜÑ][a-záéíóúüñA-ZÁÉÍÓÚÜÑ]+(?:[\s\-][A-ZÁÉÍÓÚÜÑ][a-záéíóúüñA-ZÁÉÍÓÚÜÑ]+)?)/,
    // "looking for accommodation in Madrid"
    /(?:accommodation|alojamiento|flat|apartment|studio|piso|apartamento)\s+(?:in|en)\s+([A-ZÁÉÍÓÚÜÑ][a-záéíóúüñA-ZÁÉÍÓÚÜÑ]+)/,
  ];
  // Words to reject as false-positive cities
  const NOT_CITIES = new Set([
    "work", "the", "a", "an", "for", "from", "my", "me", "looking", "need",
    "want", "find", "get", "search", "please", "help", "show", "can", "you",
    "i", "we", "us", "city", "town", "place", "area", "location",
    "september", "october", "november", "december", "january", "february",
    "march", "april", "may", "june", "july", "august",
    "monday", "tuesday", "wednesday", "thursday", "friday"
  ]);
  for (const pattern of cityPatterns) {
    const m = text.match(pattern);
    if (m) {
      const candidate = m[1].trim();
      if (!NOT_CITIES.has(candidate.toLowerCase()) && candidate.length > 2) {
        intent.city = candidate;
        break;
      }
    }
  }

  // ── PURPOSE ──────────────────────────────────────────────────────────────
  for (const [purpose, keywords] of Object.entries(PURPOSE_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) {
      intent.purpose = purpose;
      break;
    }
  }

  // ── GUESTS ───────────────────────────────────────────────────────────────
  const guestsMatch = lower.match(/(\d+)\s*(?:guest|person|people|persona|personas|pax)/);
  if (guestsMatch) {
    intent.guests = parseInt(guestsMatch[1], 10);
  } else if (/\bsolo\b|\bone person\b|\bsingle\b|\buna persona\b/.test(lower)) {
    intent.guests = 1;
  }

  // ── BUDGET (budget_max in minor units = cents) ────────────────────────────
  const budgetMatch = lower.match(/(?:under|max|budget|presupuesto|menos de|hasta)[^\d]*(\d[\d,\.]*)\s*(?:€|eur|euro)?/) ||
                      lower.match(/(\d[\d,\.]*)\s*(?:€|eur|euro)(?:\s*\/?\s*mes|month)?/);
  if (budgetMatch) {
    const raw = budgetMatch[1].replace(/[,\.]/g, "");
    const euros = parseInt(raw, 10);
    if (euros > 0 && euros < 100000) {
      intent.budget_max = euros * 100;
    }
  }

  // ── START DATE ───────────────────────────────────────────────────────────
  let dateMatch = text.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (dateMatch) {
    intent.start_date = `${dateMatch[1]}-${dateMatch[2]}-${dateMatch[3]}`;
  }
  if (!intent.start_date) {
    const monthYearMatch = lower.match(
      /(?:from|starting|desde|en|for|in)?\s*(january|february|march|april|may|june|july|august|september|october|november|december|enero|febrero|marzo|abril|mayo|junio|julio|agosto|septiembre|octubre|noviembre|diciembre|jan|feb|mar|apr|jun|jul|aug|sep|oct|nov|dec)\s*(\d{2,4})?/
    );
    if (monthYearMatch) {
      const month = resolveMonth(monthYearMatch[1]);
      const year = resolveYear(monthYearMatch[2]);
      if (month) intent.start_date = `${year}-${month}-01`;
    }
  }

  // ── DURATION ─────────────────────────────────────────────────────────────
  const durationMonthsMatch = lower.match(/(\d+)\s*(?:month|mes|meses|months)/);
  if (durationMonthsMatch) {
    intent.duration_days = parseInt(durationMonthsMatch[1], 10) * 30;
  }
  const durationDaysMatch = lower.match(/(\d+)\s*(?:day|days|día|dias)/);
  if (durationDaysMatch && !intent.duration_days) {
    intent.duration_days = parseInt(durationDaysMatch[1], 10);
  }
  const yearDurationMatch = lower.match(/(\d+)\s*(?:year|año|anos)/);
  if (yearDurationMatch && !intent.duration_days) {
    intent.duration_days = parseInt(yearDurationMatch[1], 10) * 365;
  }

  // ── UNIT TYPE ────────────────────────────────────────────────────────────
  if (/\b(?:room|habitación|habitacion|dormitorio|private room|habitación privada)\b/.test(lower)) {
    intent.unit_type = "ROOM";
  } else if (/\b(?:apartment|apartamento|flat|piso|entire home|casa entera|apartamento entero)\b/.test(lower)) {
    intent.unit_type = "APARTMENT";
  }

  return intent;
}

// ─────────────────────────────────────────────────────────────────────────────
// NEED_INFO QUESTION GENERATOR
// Generates a human-readable question for the missing required field(s).
// Required minimum: city + start_date + duration_days
// ─────────────────────────────────────────────────────────────────────────────
function buildNeedInfoQuestion(intent, locale = "en") {
  const missing = [];
  if (!intent.city)          missing.push("city");
  if (!intent.start_date)    missing.push("start_date");
  if (!intent.duration_days) missing.push("duration_days");
  if (!intent.unit_type)     missing.push("unit_type");

  const isEs = locale === "es";

  if (missing.includes("city")) {
    return isEs
      ? "¿En qué ciudad buscas el alojamiento? (ej. Málaga, Madrid, Barcelona)"
      : "Which city are you looking for accommodation in? (e.g. Málaga, Madrid, Barcelona)";
  }

  if (missing.includes("start_date") && missing.includes("duration_days")) {
    return isEs
      ? "¿Cuándo quieres entrar y por cuánto tiempo? (ej. 1 de septiembre por 3 meses)"
      : "When do you want to move in and for how long? (e.g. 1st September for 3 months)";
  }

  if (missing.includes("start_date")) {
    return isEs
      ? "¿Cuándo quieres entrar? (ej. septiembre de 2026)"
      : "When would you like to move in? (e.g. September 2026)";
  }

  if (missing.includes("duration_days")) {
    return isEs
      ? "¿Por cuánto tiempo necesitas el alojamiento? (ej. 2 meses, 90 días)"
      : "How long do you need the accommodation for? (e.g. 2 months, 90 days)";
  }

  if (missing.includes("unit_type")) {
    return isEs
      ? "¿Prefieres una habitación o un apartamento entero?"
      : "Do you prefer a room or an entire apartment?";
  }

  return isEs
    ? "¿Puedes darme más detalles sobre tu búsqueda?"
    : "Could you provide more details about what you're looking for?";
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN HOOK
// ─────────────────────────────────────────────────────────────────────────────
export function useAIDiscovery() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { lang } = useParams();
  const locale = lang || "en";
  const queryParam = searchParams.get("q") || "";

  const [status, setStatus] = useState("READY");
  const [voiceActive, setVoiceActive] = useState(false);
  const [query, setQuery] = useState(queryParam);
  const [messages, setMessages] = useState([]);
  const [properties, setProperties] = useState([]);
  const [filters, setFilters] = useState({});
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [needInfoPrompt, setNeedInfoPrompt] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const abortControllerRef = useRef(null);

  // Session ID persistent across tab reloads
  const [sessionId] = useState(() => {
    if (typeof window !== "undefined") {
      let id = localStorage.getItem("ai_session_id") || sessionStorage.getItem("ai_session_id");
      if (!id || !id.startsWith("web:")) {
        const uuidVal = (window.crypto && window.crypto.randomUUID)
          ? window.crypto.randomUUID()
          : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
              const r = (Math.random() * 16) | 0;
              return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
            });
        id = `web:${uuidVal}`;
        localStorage.setItem("ai_session_id", id);
        sessionStorage.setItem("ai_session_id", id);
      }
      return id;
    }
    return "web:flexsi-session";
  });

  // Accumulated intent from previous turns
  const [currentIntent, setCurrentIntent] = useState({
    city: null, start_date: null, duration_days: null,
    guests: null, purpose: null, budget_max: null, unit_type: null, features: []
  });

  // Trigger search when URL query param changes
  useEffect(() => {
    if (searchParams.get("voice") === "true") {
      setVoiceActive(true);
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("voice");
      setSearchParams(newParams, { replace: true });
    }
    if (queryParam) {
      setQuery(queryParam);
      executeSearch(queryParam, false);
    } else {
      resetMachine();
    }
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [queryParam]);

  const executeSearch = async (searchQuery, isFollowUp = false) => {
    console.log("[AI SEARCH] executeSearch:", searchQuery, "| follow-up:", isFollowUp);

    // Abort previous search request if any
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    setStatus("DISCOVERING");

    let intentPayload;

    if (!isFollowUp) {
      // Fresh query — parse intent from text and reset accumulator
      const parsed = extractIntentFromText(searchQuery);
      const freshIntent = {
        city: parsed.city || null,
        start_date: parsed.start_date || null,
        duration_days: parsed.duration_days || null,
        guests: parsed.guests || null,
        purpose: parsed.purpose || null,
        budget_max: parsed.budget_max || null,
        unit_type: parsed.unit_type || null,
        features: parsed.features || []
      };
      setCurrentIntent(freshIntent);
      intentPayload = freshIntent;
      setMessages([{ sender: "user", text: searchQuery }]);
    } else {
      // Follow-up — merge parsed answer into accumulated intent
      const parsed = extractIntentFromText(searchQuery);
      const merged = {
        ...currentIntent,
        // Only overwrite with parsed values if they exist
        ...(parsed.city          && { city: parsed.city }),
        ...(parsed.start_date    && { start_date: parsed.start_date }),
        ...(parsed.duration_days && { duration_days: parsed.duration_days }),
        ...(parsed.guests        && { guests: parsed.guests }),
        ...(parsed.purpose       && { purpose: parsed.purpose }),
        ...(parsed.budget_max    && { budget_max: parsed.budget_max }),
        ...(parsed.unit_type     && { unit_type: parsed.unit_type }),
      };
      setCurrentIntent(merged);
      intentPayload = merged;
      setMessages(prev => [...prev, { sender: "user", text: searchQuery }]);
    }

    console.log("[AI SEARCH] Intent payload:", intentPayload);

    try {
      const response = await fetchAiDiscovery(intentPayload, locale, sessionId, searchQuery, controller.signal);
      console.log("[AI SEARCH] Response:", response);

      const {
        action,
        intent: returnedIntent,
        message,
        chat_history,
        trident_results,
        suggestions: returnedSuggestions,
        question
      } = response;

      // Merge server-returned intent WITHOUT letting server nulls overwrite our known values.
      // The API always returns all-null intent for NEED_INFO, so we must preserve what we parsed.
      const mergedIntent = {
        ...currentIntent,
        ...(returnedIntent?.city          != null && { city: returnedIntent.city }),
        ...(returnedIntent?.start_date    != null && { start_date: returnedIntent.start_date }),
        ...(returnedIntent?.duration_days != null && { duration_days: returnedIntent.duration_days }),
        ...(returnedIntent?.guests        != null && { guests: returnedIntent.guests }),
        ...(returnedIntent?.purpose       != null && { purpose: returnedIntent.purpose }),
        ...(returnedIntent?.unit_type     != null && { unit_type: returnedIntent.unit_type }),
      };

      if (returnedIntent) {
        setCurrentIntent(mergedIntent);
      }

      // Build AI chat message for this turn
      let aiMessage;
      if (action === "NEED_INFO") {
        // Use the server-provided localized question directly if available
        aiMessage = question || buildNeedInfoQuestion(mergedIntent, locale);
      } else if (action === "SHOW_3") {
        aiMessage = locale === "es"
          ? "¡He encontrado 3 opciones perfectas para ti! Elige la que más te guste."
          : "I found 3 great options for you! Choose the one that fits best.";
      } else if (action === "NO_STOCK") {
        aiMessage = locale === "es"
          ? "No encontré disponibilidad para estos criterios. Prueba con fechas o ciudad diferentes."
          : "No availability found for these criteria. Try different dates or city.";
      } else if (action === "FALLBACK") {
        aiMessage = locale === "es"
          ? "No encontré una coincidencia exacta, pero aquí hay algunas opciones similares."
          : "No exact match, but here are some similar options you might like.";
      } else {
        aiMessage = message || "";
      }

      // Sync messages — prefer backend chat_history if provided
      if (chat_history && chat_history.length > 0) {
        setMessages(
          chat_history.map(chat => ({
            sender: chat.role === "user" ? "user" : "ai",
            text: chat.message
          }))
        );
      } else if (aiMessage) {
        setMessages(prev => [...prev, { sender: "ai", text: aiMessage }]);
      }

      // Update state machine
      if (action === "SHOW_3") {
        const listings = (trident_results || []).slice(0, 3).map(item => ({
          ...item.listing,
          id: item.id,
          justification: item.justification
        }));
        setProperties(listings);
        setFilters(mergedIntent);
        setStatus("SHOW_3");

      } else if (action === "NEED_INFO") {
        setNeedInfoPrompt(aiMessage);
        setStatus("NEED_INFO");

      } else if (action === "NO_STOCK") {
        setProperties([]);
        setSuggestions(returnedSuggestions || []);
        setStatus("NO_STOCK");

      } else if (action === "FALLBACK") {
        const listings = (trident_results || []).map(item => ({
          ...item.listing,
          id: item.id,
          justification: item.justification
        }));
        setProperties(listings);
        setFilters(mergedIntent);
        setStatus("FALLBACK");

      } else {
        throw new Error(`Unexpected action from server: ${action}`);
      }

    } catch (error) {
      if (error.name === "CanceledError" || error.name === "AbortError" || error.code === "ERR_CANCELED" || error.message === "canceled") {
        console.log("[AI SEARCH] Search aborted:", searchQuery);
        return;
      }
      console.error("[AI SEARCH] Error:", error);
      const errMsg = locale === "es"
        ? "Ha ocurrido un error al procesar tu búsqueda. Por favor, inténtalo de nuevo."
        : "Something went wrong while processing your search. Please try again.";
      setMessages(prev => [...prev, { sender: "ai", text: errMsg }]);
      setStatus("ERROR");
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
    }
  };

  const submitQuery = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    if (status === "READY") {
      setSearchParams({ q: trimmed });
    } else {
      executeSearch(trimmed, true);
    }
  };

  const provideInfo = (answer) => {
    const trimmed = answer.trim();
    if (!trimmed) return;
    executeSearch(trimmed, true);
  };

  const selectListing = (property) => {
    setSelectedProperty(property);
    setStatus("CONFIRMING");
  };

  const confirmBooking = () => {
    setStatus("CLOSING");
  };

  const toggleVoice = (active) => {
    setVoiceActive(active);
  };

  const getWelcomeMessage = (loc) => {
    return loc === "es"
      ? "¡Hola! Soy tu asistente de FlexsiRent. Describe tu estancia (ej. la ciudad, fecha de entrada, duración y presupuesto) para empezar a buscar propiedades."
      : "Hello! I am your FlexsiRent AI assistant. Describe your stay (e.g. city, move-in date, duration, and budget) to find matching properties.";
  };

  const resetMachine = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setQuery("");
    setMessages([{ sender: "ai", text: getWelcomeMessage(locale) }]);
    setProperties([]);
    setFilters({});
    setSelectedProperty(null);
    setNeedInfoPrompt("");
    setSuggestions([]);
    setCurrentIntent({
      city: null, start_date: null, duration_days: null,
      guests: null, purpose: null, budget_max: null, unit_type: null, features: []
    });
    setStatus("READY");
  };

  const resetAll = () => {
    setSearchParams({});
    resetMachine();
  };

  return {
    status, voiceActive, query, messages, properties, filters,
    selectedProperty, needInfoPrompt, suggestions,
    submitQuery, provideInfo, selectListing, confirmBooking,
    toggleVoice, resetAll,
  };
}
