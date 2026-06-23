import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { playbookAccountApi } from "./vite/playbookAccountApi";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/existing-business-ai-playbook/" : "/",
  plugins: [react(), playbookAccountApi()],
  define: {
    global: "globalThis",
  },
  build: {
    outDir: "dist",
    copyPublicDir: true,
  },
  server: {
    port: 3000,
  },
});
