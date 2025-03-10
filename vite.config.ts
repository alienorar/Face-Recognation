import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@", replacement: "/src/*" },
      { find: "@modules", replacement: "/src/modules" },
      { find: "@api", replacement: "/src/api" },
      { find: "@types", replacement: "/src/types" },
      { find: "@components", replacement: "/src/components" },
    ]
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://217.114.4.62:30300/api', 
        changeOrigin: true,
        secure: false,
      },
    },
  },
})


