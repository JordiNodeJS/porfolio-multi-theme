import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE_PATH === "/"
    ? "/"  // Use absolute root path for main domain deployment
    : process.env.VITE_BASE_PATH 
      ? process.env.VITE_BASE_PATH 
      : process.env.NODE_ENV === "production" 
        ? "/porfolio-multi-theme/" 
        : "/",
  build: {
    outDir: "dist",
  },
});
