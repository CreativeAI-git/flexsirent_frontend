# Flexsirent Frontend - Delivery & Deployment Guide 🚀

Hi Team,

The frontend integration is complete. Below are the details regarding delivery, repository transfer, and deployment notes for staging/production setup:

---

## 1. Repository Transfer & Delivery Date 📦

*   **Repository Name**: `flexsi_translator`
*   **Current GitHub URL**: `https://github.com/mourya5678/flexsi_translator`
*   **Ownership Transfer**: We will transfer the repository ownership to the **`ralaminos-cto`** account (the same way the backend repository was transferred).
*   **Concrete Delivery Date**: **August 21, 2026** (The transfer process will be initiated within 24 hours of your confirmation/green light).

---

## 2. Deployment Notes ⚙️

To deploy the application in your staging/production environments, follow the steps below:

### **Runtime Requirements**
*   **Node.js Version**: **Node v20 (LTS)** or higher is recommended.
*   **Package Manager**: `npm` is used for managing dependencies.

### **Required Environment Variables (`.env` Config)**
Configure these keys in your hosting environment configuration or define them in a `.env` file:

```env
# REST API Base Endpoint URL
VITE_API_URL=https://backend.flexsirent.com/api/

# Real-time WebSocket Gateway URL
VITE_SOCKET_URL=https://backend.flexsirent.com

# AI Discovery & Search Turn Gateway URL
VITE_AI_URL=https://api.flexsirent.com

# AI Gateway API Bearer Token
VITE_AI_TOKEN=<configure in the environment, never commit>

# Production Site Canonical Base Address (used for SEO & canonical tag generation)
VITE_CANONICAL_URL=https://flexsirent.com
```

### **Build & Run Commands**

1. **Install Dependencies**:
   ```bash
   npm install
   ```
2. **Generate Production Build**:
   ```bash
   npm run build
   ```
   *(This triggers `react-router build && node fix-build.js`. The `fix-build.js` script handles post-processing of build paths to ensure seamless Linux compatibility.)*
   
3. **Run the SSR Server (using Process Manager - PM2)**:
   In production, we recommend using PM2 to manage the SSR process and ensure it stays active and automatically restarts on crashes:
   ```bash
   pm2 start "npx react-router-serve build/server/index.js" --name "flexsi-frontend-ssr"
   ```
   *   **Port**: The SSR server listens on port **`3000`** by default.
   *   **Custom Port**: To configure a custom port, prepend the `PORT` environment variable:
       ```bash
       PORT=8080 pm2 start "npx react-router-serve build/server/index.js" --name "flexsi-frontend-ssr"
       ```
   *   **Reverse Proxy**: Configure Nginx or Cloudflare to reverse-proxy external web traffic directly to the SSR server port (`3000` or your custom port).

---

## 3. Live URL & Testing 🌐

*   **Current Status**: Since we do not host a permanent staging instance in our local development workspace, we request that you deploy the build to your own staging server after the repository transfer.
*   **Live Preview Option**: If you need to perform verification checks before accepting the repository transfer, we can launch an **ngrok tunnel** (pointing to our local instance at e.g., `542fa1c6efcd.ngrok-free.app`) to let you preview the live app.

---

## 4. Acceptance Criteria Verification Checklist ✅

The following items are verified and ready for testing:

1.  **SSR Verification (curl without JS)**:
    React Router v7 handles SSR by default. Testing with JS disabled returns the fully rendered layout and SEO markup in the initial HTML payload:
    ```bash
    curl -H "Accept: text/html" https://your-staging-url.com
    ```
2.  **Conversational Flow (Search Turn API)**:
    Both the homepage search bar and floating chat widgets target the `https://api.flexsirent.com/search/turn` endpoint dynamically and handle structured search payloads.
3.  **Session ID Persistence**:
    `session_id` (`web:<uuid>`) is persisted across `localStorage` and `sessionStorage`. Performing a search via the hero bar automatically synchronizes and continues the thread on the floating chat.
    *   *Implementation reference*: [AIChatContext.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Abhay/flexsi_translator/src/shared/context/AIChatContext.jsx#L41-L52)
4.  **Contract v1.2 Actions (All 6 actions)**:
    All response actions are fully mapped to render corresponding components:
    *   `NEED_INFO`: Renders forms prompting for missing fields.
    *   `SHOW_3`: Displays the primary 3 recommended listing cards.
    *   `SHOW_MORE_3`: Renders additional listings.
    *   `NO_STOCK`: Renders custom out-of-stock messages.
    *   `FALLBACK`: Displays standard assistant/help messages.
    *   `LISTING_ANSWER`: Renders inline responses regarding a specific listing.
    *   *Implementation reference*: [FloatingChat.jsx](file:///c:/Users/DELL/OneDrive/Desktop/Abhay/flexsi_translator/src/components/FloatingChat.jsx#L618-L685)
5.  **Mandatory `unit_type` Gate**:
    If a user submits their first query without specifying the unit type (`ROOM` or `APARTMENT`), the client-side validation gates the query and prompts the user using a `NEED_INFO` option selection form.
    *   *Implementation reference*: [useAIDiscovery.js](file:///c:/Users/DELL/OneDrive/Desktop/Abhay/flexsi_translator/src/shared/hooks/useAIDiscovery.js#L164)
6.  **No Hardcoded API URLs**:
    All base endpoints are read dynamically from runtime environment variables.
    *   *Implementation reference*: [aiService.js](file:///c:/Users/DELL/OneDrive/Desktop/Abhay/flexsi_translator/src/shared/services/aiService.js#L4-L9)
