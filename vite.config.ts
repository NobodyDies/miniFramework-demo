import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve('', 'src/index.ts'),
      name: 'MiniFramework',
      fileName: 'mini-framework'
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {}
      }
    }
  },
  plugins: [
    dts({
      insertTypesEntry: true,
    })
  ],
  test: {
    environment: 'happy-dom'
  },
});
