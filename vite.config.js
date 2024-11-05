import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/user': {
        target: 'http://localhost:8080', // 后端服务器地址
        changeOrigin: true,
      },
      '/room': {
        target: 'http://localhost:8080', // 后端服务器地址
        changeOrigin: true,
      },
    }
  }
})
