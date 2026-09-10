import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  server: {
    host: '0.0.0.0',
    port: 5173,
  },

  define: {
    CESIUM_BASE_URL: JSON.stringify('/cesium'),
  },

  build: {
    chunkSizeWarningLimit: 2000,
  },
})