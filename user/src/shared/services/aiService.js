import axios from "axios";

// Integration Configuration - queries local SSR proxy instead of external API directly
const AI_CONFIG = {
  url: "/api/ai/search"
};

/**
 * Production-ready handler for AI search queries.
 * Calls /search/turn endpoint via secure server proxy.
 */
export async function fetchAiDiscovery(intent, locale = "en", sessionId = "flexsi-session", messageText = null, signal = null) {
  const targetUrl = AI_CONFIG.url;

  // Normalize locale to BCP-47 format (e.g. 'en' -> 'en-US', 'es' -> 'es-ES')
  const bcp47Locale = locale.toLowerCase().startsWith("es") ? "es-ES" : "en-US";

  const payload = {
    session_id: sessionId,
    locale: bcp47Locale,
    channel: "web",
    message_text: messageText || null,
    intent: {
      city: intent.city || null,
      start_date: intent.start_date || null,
      duration_days: intent.duration_days ? parseInt(intent.duration_days, 10) : null,
      guests: intent.guests ? parseInt(intent.guests, 10) : null,
      purpose: intent.purpose || null,
      budget_max: intent.budget_max ? parseInt(intent.budget_max, 10) : null,
      unit_type: intent.unit_type || null,
      features: intent.features || []
    }                                                                                                                                                                                                                                        
  };

  console.log(`[AI SERVICE] Posting to local proxy: ${targetUrl}`, payload);
  try {
    const response = await axios.post(
      targetUrl,
      payload,
      {
        headers: {
          "Content-Type": "application/json"
        },
        ...(signal && { signal })
      }
    );

    const data = response?.data || {};
    const action = data.action; // SHOW_3, NEED_INFO, NO_STOCK, FALLBACK

    if (!action) {
      throw new Error("Missing 'action' field in AI search response contract.");
    }

    return data;
  } catch (error) {
    console.error("[AI SERVICE] Failed to fetch proxy AI Discovery results:", error);
    throw error;
  }
}

/**
 * Custom search turn client for assistant-ui integration (Contract v1.1).
 * Always sends intent: {} and raw message text.
 */
export async function fetchSearchTurn(messageText, sessionId, locale = "en", signal = null, listingId = null, intent = {}) {
  const targetUrl = AI_CONFIG.url;

  // Normalize locale to BCP-47 format
  const bcp47Locale = locale.toLowerCase().startsWith("es") ? "es-ES" : "en-US";

  const payload = {
    session_id: sessionId,
    locale: bcp47Locale,
    channel: "web",
    message_text: messageText,
    intent: intent || {}
  };

  if (listingId) {
    payload.listing_id = listingId;
  }

  console.log(`[AI SERVICE] Posting search turn to proxy: ${targetUrl}`, payload);
  try {
    const response = await axios.post(
      targetUrl,
      payload,
      {
        headers: {
          "Content-Type": "application/json"
        },
        ...(signal && { signal })
      }
    );

    const data = response?.data || {};
    const action = data.action; // NEED_INFO, SHOW_3, SHOW_MORE_3, NO_STOCK, FALLBACK

    if (!action) {
      throw new Error("Missing 'action' field in AI search response.");
    }

    return data;
  } catch (error) {
    console.error("[AI SERVICE] Failed in fetchSearchTurn via proxy:", error);
    throw error;
  }
}

