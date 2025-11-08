
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      'asset:outdrobe.png': path.resolve(__dirname, './src/assets/outdrobe.png'),
      'asset:logo.png': path.resolve(__dirname, './src/assets/logo.png'),
      'asset:fitstack.png': path.resolve(__dirname, './src/assets/fitstack.png'),
      'asset:scantaps.png': path.resolve(__dirname, './src/assets/scantaps.png'),
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