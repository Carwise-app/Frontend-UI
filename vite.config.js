import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/listing': {
        target: 'https://carwisegw.yusuftalhaklc.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
