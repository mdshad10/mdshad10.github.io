import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
