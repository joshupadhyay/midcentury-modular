import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // update this section with comments baout the proxy
  // I had to disable Ublock to get posthog to work, so this must relate to how ad blockers view traffic from your site.
  // interesting stuff!
  server: {
    host: "::",
    port: 8080,
    proxy: {
      "/ingest": {
        target: "https://us.i.posthog.com",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/ingest/, ""),
      },
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
