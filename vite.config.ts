import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      // 匹配所有以 '/api' 开头的请求
      '/api': {
        target: 'http://localhost:3000', // 你的后端服务器地址
        changeOrigin: true, // 支持跨域，必须设置为 true
      },
    },
  },
})
