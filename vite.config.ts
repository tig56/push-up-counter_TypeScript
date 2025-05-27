import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/push-up-counter_TypeScript/',
  publicDir: 'public',
  plugins: [react()],
})
