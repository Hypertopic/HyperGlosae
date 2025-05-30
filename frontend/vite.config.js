import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';

export default defineConfig({
  plugins: [react(), eslint({lintOnStart: true})],
  define: {
    // https://github.com/vitejs/vite/issues/1973#issuecomment-787571499
    'process.env': {},
  },
  server: {
    port: 3000,
    proxy: {
      '/api/_users': {
        target: 'http://localhost:5984/_users',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/_users/, ''),
      },
      '/api/_session': {
        target: 'http://localhost:5984/_session',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/_session/, ''),
      },
      '/api': {
        target: 'http://localhost:5984/hyperglosae',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  build: {
    outDir: 'build',
  },
});
