import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteSassDts from 'vite-plugin-sass-dts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteSassDts()],
  css: {
    preprocessorOptions: {
      sass: {
        api: 'modern-compiler',
      },
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: ['./src/preprocessor/App.sass', './src/preprocessor/index.sass'],
      output: {
        assetFileNames: 'style.[ext]',
      },
    }
  },
})
