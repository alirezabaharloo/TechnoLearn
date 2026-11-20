import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// The API base URL can be overridden with VITE_API_BASE_URL. By default the
// frontend uses a relative "/api" path and lets the Vite dev server proxy it
// to the Django backend, so no hardcoded host is needed.
const apiBaseUrl = process.env.VITE_API_BASE_URL || "/api";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: [".e2b.app"],
    port: 5173,
    proxy: {
      "/api": {
        target: process.env.VITE_PROXY_TARGET || "http://127.0.0.1:8000",
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: true,
    port: 4173,
  },
});
