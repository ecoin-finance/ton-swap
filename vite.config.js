import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import commonjs from '@rollup/plugin-commonjs';

export default defineConfig({
  define: {
    'global': {},
    'process.env': {}
  },
  optimizeDeps: {
    include: ['axios', '@ton/ton'],
  },
  plugins: [
    commonjs(),
    nodePolyfills()
  ],
  build: {
    rollupOptions: {
      external: ['https://cdn.jsdelivr.net/npm/@ton/ton@15.1.0/dist/index.js'],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return id.split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  }
});