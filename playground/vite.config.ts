import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// eslint-disable-next-line antfu/no-import-dist
import CodeDeleter from '../dist/index.mjs'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), CodeDeleter({ })],
  build: {
    minify: false,
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
})
