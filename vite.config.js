import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // <--- Key for v4

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [
      react(),
      tailwindcss(), // <--- Must be here
    ],
    server: {
      port: 5173,
      strictPort: true,
      allowedHosts: env.VITE_ALLOWED_HOST ? [env.VITE_ALLOWED_HOST] : [],
      proxy: {
        '/api': {
          target: env.VITE_API_TARGET || 'http://localhost:5000',
          changeOrigin: true,
        },
      },
    },
  };
})
