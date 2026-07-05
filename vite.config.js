import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: "app.html",
      output: {
        entryFileNames: "assets/build/[name]-[hash].js",
        chunkFileNames: "assets/build/[name]-[hash].js",
        assetFileNames: "assets/build/[name]-[hash][extname]"
      }
    }
  }
});
