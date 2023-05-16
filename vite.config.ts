import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { fileURLToPath, URL } from 'url';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [vue(), vueJsx()],
  build: {
    minify: false,
  },
  resolve: {
    alias: {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      '@': fileURLToPath(new URL('client', import.meta.url)),
    },
  },
});
