
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'asset:outdrobe.webp': path.resolve(__dirname, './src/assets/outdrobe.webp'),
      'asset:logo.png': path.resolve(__dirname, './src/assets/logo.png'),
      'asset:fitstack.webp': path.resolve(__dirname, './src/assets/fitstack.webp'),
      'asset:scantaps.webp': path.resolve(__dirname, './src/assets/scantaps.webp'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    open: true,
  },
});