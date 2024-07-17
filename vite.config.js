import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/se_project_react/',
  // add the server object
  server: {
    port: 3000,
  },
});