import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  build: {
    outDir: 'dist',
    // Generate a _redirects file for Netlify or similar hosting services
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        stats: resolve(__dirname, 'stats/index.html')
      },
      output: {
        manualChunks: undefined
      }
    }
  },
  // This ensures that the router works properly in production
  // by returning index.html for all routes
  preview: {
    port: 4173,
    host: true
  }
})
