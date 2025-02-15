import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import eslint from 'vite-plugin-eslint';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    eslint(),
    react(),
    tailwindcss()
  ],
  server: {
    port: 3000,
    strictPort: true
  }
})
