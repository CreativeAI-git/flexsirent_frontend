import axios from "axios";

export async function action({ request }) {
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method Not Allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

  try {
    const payload = await request.json();

    // Get the base AI Url and token securely from the server environment
    const aiUrl = (process.env.AI_URL || import.meta.env.VITE_AI_URL || "https://api.flexsirent.com").replace(/\/+$/, "");
    // Use non-VITE prefixed env variable to ensure Vite never bundles it to the client
    const aiToken = process.env.AI_TOKEN || import.meta.env.VITE_AI_TOKEN;

    const response = await axios.post(`${aiUrl}/search/turn`, payload, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${aiToken}`
      }
    });

    return new Response(JSON.stringify(response.data), {
      status: response.status || 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    console.error("[PROXY API ERROR]", error?.response?.data || error.message);
    const status = error?.response?.status || 500;
    const errorData = error?.response?.data || { error: "Failed to proxy AI search query." };
    return new Response(JSON.stringify(errorData), {
      status,
      headers: { "Content-Type": "application/json" }
    });
  }
}
