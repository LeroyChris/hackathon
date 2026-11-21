import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Konfigurasi minimal: tanpa API eksternal (PRD 5.2), font sistem (tanpa Google Fonts).
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: '127.0.0.1',
  },
  preview: {
    port: 4173,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
