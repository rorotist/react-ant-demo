import path from 'path'

import ckeditor5 from '@ckeditor/vite-plugin-ckeditor5'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      include: '**/*.jsx'
    }),
    ckeditor5({ theme: require.resolve('@ckeditor/ckeditor5-theme-lark') })
  ],
  define: {
    // Some libraries use the global object, even though it doesn't exist in the browser.
    // Alternatively, we could add `<script>window.global = window;</script>` to index.html.
    // https://github.com/vitejs/vite/discussions/5912
    // global: {}
  },
  server: {
    port: 9999
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx'
      },
      define: {
        global: 'globalThis'
      }
    }
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, 'src') },
      {
        find: '@components',
        replacement: path.resolve(__dirname, 'src/components')
      },
      {
        find: '@styles',
        replacement: path.resolve(__dirname, 'src/styles')
      },
      {
        find: '@constants',
        replacement: path.resolve(__dirname, 'src/constants')
      },
      {
        find: '@utils',
        replacement: path.resolve(__dirname, 'src/utils')
      },
      {
        find: '@pages',
        replacement: path.resolve(__dirname, 'src/pages')
      },
      {
        find: '@assets',
        replacement: path.resolve(__dirname, 'src/assets')
      },
      {
        find: '@services',
        replacement: path.resolve(__dirname, 'src/services')
      },
      {
        find: '@mock',
        replacement: path.resolve(__dirname, 'src/mockData')
      },
      {
        find: '@hooks',
        replacement: path.resolve(__dirname, 'src/hooks')
      },
      {
        find: '@queries',
        replacement: path.resolve(__dirname, 'src/services/queries')
      }
    ]
  }
})
