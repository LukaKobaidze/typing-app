import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      { find: 'shared', replacement: path.resolve(__dirname, '../shared') },
    ],
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
});
