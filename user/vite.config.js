// Force restart trigger: 2026-06-24T19:55:00
import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import path from "path";

export default defineConfig({
    plugins: [reactRouter()],
    server: {
        port: 5174,
        allowedHosts: true,
        proxy: {
            "/api-gateway": {
                target: "https://api.flexsirent.com",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api-gateway/, "")
            }
        }
    },
    // Force a single copy of react, react-dom, and react-router
    // across ALL packages (prevents dual-instance useContext errors)
    resolve: {
        dedupe: ["react", "react-dom", "react-router"],
        alias: [
            { find: "@", replacement: path.resolve(__dirname, "./src") },
            { find: "jspdf", replacement: path.resolve(__dirname, "./node_modules/jspdf/dist/jspdf.es.min.js") },
            { find: "react-router-dom", replacement: "react-router" },
        ],
    },
    // Force pre-bundle these as a single chunk in dev server
    optimizeDeps: {
        include: ["react", "react-dom", "react-router"],
    },
    // Tell Vite SSR to bundle these instead of treating them as external Node modules
    ssr: {
        noExternal: ["react-router"],
    },
});