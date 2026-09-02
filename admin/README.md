# FlexsiRent - Admin Panel Frontend

This repository contains the administrative dashboard frontend for **FlexsiRent**, built with React 19, Redux Toolkit, and Ant Design.

---

## 📌 Architecture Overview

- **Framework:** React 19 (Client-Side Rendered SPA)
- **Routing:** React Router v6
- **State Management:** Redux Toolkit & React-Redux
- **UI Components:** Ant Design (v5), Bootstrap 5, ApexCharts
- **HTTP Client:** Axios with JWT Bearer authentication interceptor
- **Real-time:** Socket.IO Client

---

## 🛠️ Prerequisites

- **Node.js:** `>= 18.x` (Recommended: Node `20.x LTS`)
- **NPM:** `>= 9.x`

---

## ⚙️ Environment Variables

Create a `.env` file in the root of the admin directory (`flexsi_rent_frontend/admin/.env`):

```env
# Backend API Base URL
REACT_APP_API_BASE_URL=https://backend.flexsirent.com/api/

# Real-time WebSocket Server URL
REACT_APP_SOCKET_URL=https://backend.flexsirent.com

# Web Profile Redirection URL
REACT_APP_WEB_URL=https://flexsirent.com/profile/

# Base Public Path
PUBLIC_URL=/admin
```

---

## 🚀 Installation & Local Development

1. **Install Dependencies:**
   ```bash
   npm install --force
   ```

2. **Run Development Server:**
   ```bash
   npm start
   ```
   The application will be accessible at `http://localhost:3000/admin`.

---

## 📦 Production Build & Deployment

1. **Create Production Build:**
   ```bash
   npm run build
   ```
   This generates an optimized static production bundle in the `build/` directory.

2. **Web Server Deployment (Nginx Example):**
   Since this is a client-side SPA, serve the static `build` directory with fallback routing to `/admin/index.html`:

   ```nginx
   server {
       listen 80;
       server_name admin.flexsirent.com;

       location /admin {
           alias /var/www/flexsi_rent_frontend/admin/build;
           index index.html;
           try_files $uri $uri/ /admin/index.html;
       }

       location /api/ {
           proxy_pass http://localhost:4000/api/;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

---

## 📁 Project Structure

```
admin/
├── public/               # Static assets and index.html template
├── src/
│   ├── components/       # Reusable UI components
│   ├── pages/            # Dashboard & module views (Bookings, Properties, Hosts, Users, KYC, etc.)
│   ├── redux/            # Redux store, slices, and asynchronous API actions
│   ├── routes/           # Routing configuration and Backend endpoint definitions
│   ├── shared/           # Shared layout, header, sidebar, footer
│   └── utills/           # Helper functions, formatters, and schemas
├── .env.example          # Environment variables template
├── package.json          # Dependencies and build scripts
└── README.md             # Project documentation
```
