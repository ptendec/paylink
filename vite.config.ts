import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react(),
  ],
  optimizeDeps: {
    noDiscovery: true,
    include: [],
  },
  cacheDir: '.yarn/.vite',
  server: {
    port: 3000,
  },
});
