import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Amitresto',
        short_name: 'Amitresto',
        description: 'Order delicious food from Amitresto Restaurant',
        theme_color: '#ff8c00',
        background_color: '#ffffff',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon2.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
