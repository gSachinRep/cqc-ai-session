import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    target: 'es2018'
  },
  server: {
    host: '0.0.0.0',
    port: 5500,
    strictPort: true
  }
})
