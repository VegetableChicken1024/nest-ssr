import { createSSRApp } from 'vue';
import App from './App.vue';
import { persistPlugin } from './plugins/persist';
import { createRouter } from './router';
import { createStore } from './store';
export const createApp = () => {
  const app = createSSRApp(App);
  const router = createRouter();
  const store = createStore();
  store.use(persistPlugin);
  app.use(router);
  app.use(store);
  return { app, router, store };
};
