import axios from "axios";
import { BASE_URL, webPropertiesAPI } from "../routes/apiURLs";

// Simple helper to fetch actual properties from the API so our mock listings use real database values
let cachedProperties = null;

async function getProperties() {
  if (cachedProperties) return cachedProperties;
  try {
    const res = await axios.get(`${BASE_URL}${webPropertiesAPI}`);
    cachedProperties = res.data?.data || [];
    return cachedProperties;
  } catch (error) {
    console.error("Error fetching properties for mock service:", error);
    return [];
  }
}

export async function fetchAiDiscoveryResponse(query) {
  // Wait 1.5 seconds to simulate API request latency
  await new Promise((resolve) => setTimeout(resolve, 1500));

  const trimmedQuery = query.toLowerCase().trim();
  if (trimmedQuery.includes("error")) {
    throw new Error("Simulated API Error");
  }
  const allProperties = await getProperties();

  // Helper to map actual database records to our mock IDs
  const getMockProperties = (ids) => {
    return allProperties.filter(p => ids.includes(Number(p.property_id)));
  };

  // 1. NEED_INFO state trigger
  if (
    trimmedQuery === "apartment" ||
    trimmedQuery === "flat" ||
    trimmedQuery === "rent" ||
    trimmedQuery.length < 5
  ) {
    return {
      action: "NEED_INFO",
      payload: {
        query: query,
        message: "To find the best accommodation, could you please specify which city you are looking in, your monthly budget, or preferred dates?",
        missing_fields: ["location", "budget"],
        question: "Which city are you looking to rent a place in?"
      }
    };
  }

  // 2. NO_STOCK state trigger
  if (
    trimmedQuery.includes("sahara") ||
    trimmedQuery.includes("desert") ||
    trimmedQuery.includes("under 100") ||
    trimmedQuery.includes("under 50")
  ) {
    return {
      action: "NO_STOCK",
      payload: {
        query: query,
        message: "We currently do not have any properties matching these parameters.",
        suggestions: [
          "Try increasing the monthly rent budget limit",
          "Broaden the search area to adjacent cities",
          "Check for standard flexible stay options"
        ]
      }
    };
  }

  // 3. FALLBACK state trigger
  if (
    trimmedQuery.includes("mumbai under 10k") ||
    trimmedQuery.includes("pune under 5k") ||
    trimmedQuery.includes("fallback")
  ) {
    // Return adjacent properties as fallback (ids: 44, 47)
    const fallbackList = getMockProperties([44, 47]);
    return {
      action: "FALLBACK",
      payload: {
        query: query,
        message: "We couldn't find any direct matches within that pricing limit. However, here are some options nearby with slightly adjusted criteria.",
        original_filters: {
          location: "Pune",
          budget: "5000"
        },
        adjusted_filters: {
          location: "Pune",
          budget: "25000"
        },
        properties: fallbackList
      }
    };
  }

  // 4. SHOW_3 (Trident) state triggers (matches Pune/Mumbai/Bangalore/default queries)
  // We grab real database records (ids: 32, 40, 43, or others) to populate the exact 3-listing result
  const tridentIds = trimmedQuery.includes("mumbai") ? [44, 47, 52] : [32, 40, 43];
  const matchedListings = getMockProperties(tridentIds);

  // Fallback to direct array slice if query doesn't match specific cities
  if (matchedListings.length < 3) {
    const backupListings = allProperties.slice(0, 3);
    return {
      action: "SHOW_3",
      payload: {
        query: query,
        message: `Here are the top 3 verified properties matching "${query}".`,
        filters: {
          location: "Pune",
          budget: "35000",
          bhk: "2"
        },
        properties: backupListings
      }
    };
  }

  return {
    action: "SHOW_3",
    payload: {
      query: query,
      message: `Here are the top 3 verified properties matching your query in the area.`,
      filters: {
        location: trimmedQuery.includes("mumbai") ? "Mumbai" : "Pune",
        budget: "30000",
        bhk: "2"
      },
      properties: matchedListings.slice(0, 3) // Hard enforce exactly 3 elements
    }
  };
}
