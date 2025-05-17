import { defineConfig } from 'vite';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/buddies-html/' : '/',
  build: {
    rollupOptions: {
      // Use default output options so Vite will hash CSS and JS filenames
    },
  },
  plugins: [],
})); 