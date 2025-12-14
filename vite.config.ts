import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, '.', '');

  return {
    // Define process.env.API_KEY globally so the Gemini SDK can access it
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY),
    },
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
        manifest: {
          name: 'ResilientMind Assessment',
          short_name: 'ResilientMind',
          description: 'Professional resilience assessment tool',
          theme_color: '#f0fdfa',
          background_color: '#f0fdfa',
          display: 'standalone',
          scope: '/',
          start_url: '/',
          orientation: 'portrait',
          icons: [
            {
              src: 'https://cdn-icons-png.flaticon.com/512/2913/2913584.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any maskable'
            },
            {
              src: 'https://cdn-icons-png.flaticon.com/512/2913/2913584.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
  };
});