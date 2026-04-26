import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Split vendor libraries for better caching
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/@google/generative-ai')) {
            return 'gemini'
          }
        }
      }
    },
    // Warn if any chunk > 500KB
    chunkSizeWarningLimit: 500,
  }
})
