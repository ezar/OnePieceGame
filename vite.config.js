import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ command }) => ({
  define: {
    __BUILD_DATE__: JSON.stringify((() => {
      const d = new Date();
      const yy = String(d.getUTCFullYear()).slice(2);
      const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
      const dd = String(d.getUTCDate()).padStart(2, '0');
      const hhmm = String(d.getUTCHours()).padStart(2, '0') + String(d.getUTCMinutes()).padStart(2, '0');
      return `v${yy}.${mm}.${dd}.${hhmm}`;
    })()),
  },
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'icon-192.svg'],
      manifest: {
        name: 'One Piece: Aventura Pirata',
        short_name: 'One Piece',
        description: '¡Crea tu personaje pirata y consigue tu recompensa!',
        theme_color: '#0a3a6b',
        background_color: '#0c1e3e',
        display: 'standalone',
        orientation: 'portrait',
        scope: command === 'build' ? '/OnePieceGame/' : '/',
        start_url: command === 'build' ? '/OnePieceGame/' : '/',
        icons: [
          {
            src: 'icon-192.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
          {
            src: 'favicon.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any',
          },
        ],
      },
    }),
  ],
  base: command === 'build' ? '/OnePieceGame/' : '/',
}))
