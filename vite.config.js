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

});