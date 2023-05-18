import { createApp } from './main';

const { app, router, store } = createApp();
router.isReady().then(() => {
  store.state.value = window.__INITIAL_STATE__;
  app.mount('#app', true);
});
