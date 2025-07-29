import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { analyzer } from 'vite-bundle-analyzer'

export default defineConfig({
  plugins: [
    react(),
    process.env.ANALYZE && analyzer({ analyzerMode: 'static' })
  ].filter(Boolean),
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          animations: ['animejs', '@react-spring/web'],
          graphics: ['roughjs']
        }
      }
    }
  }
})