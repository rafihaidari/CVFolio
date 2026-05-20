import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/calcom-api': {
        target: 'https://api.cal.eu',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/calcom-api/, '/v2'),
        secure: true,
      },
    },
  },
})



