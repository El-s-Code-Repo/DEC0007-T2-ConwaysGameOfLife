import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    host:true,
    port:7777,
    strictPort:true,
  },
  build: {
    outDir: '../Backend/static/',
    assetsDir: 'static',
    target: 'es2022',
    sourcemap: true,
    assetsInlineLimit: 8192, // Inline assets under 8 KB
    chunkSizeWarningLimit: 600,
    cssCodeSplit: true,
  },
})
