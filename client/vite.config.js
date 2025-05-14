// client/vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  root: path.resolve(__dirname),
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    outDir: path.resolve(__dirname, '../dist'), 
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
})
