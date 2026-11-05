import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/sushione/',
  server: {
    host: true,
    port: 5173
  }
})
