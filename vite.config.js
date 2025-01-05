import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
 plugins: [react()],
  server: {
    port: 3000, // Use PORT from the environment or fallback to 3000
    host: true, // Allows external access (e.g., Render can bind to it)
  },})
