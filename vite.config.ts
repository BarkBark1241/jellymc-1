import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
  },
  // This ensures that the router works properly in production
  // by returning index.html for all routes
  preview: {
    port: 4173
  }
})
