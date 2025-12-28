import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <--- Key for v4

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // <--- Must be here
  ],
})
