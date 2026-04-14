import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  root: './private',
  server: {
    port: 5173,
    open: true, // Abre automaticamente o index.html
    strictPort: true
  },
  build: {
    outDir: '../public/dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'private/index.html')
      }
    }
  }
})
