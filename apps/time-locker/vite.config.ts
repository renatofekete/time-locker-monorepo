import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";
import path from "path";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), svgr()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      // This will proxy all requests starting with /api to the target server
      "/api": {
        target: "https://api-test.time-locker.com",
        changeOrigin: true,
        secure: false, // Disable SSL certificate validation
        rewrite: (path) => path.replace(/^\/api/, "/api"), // Optional if the path structures match
      },
    },
  },
});
