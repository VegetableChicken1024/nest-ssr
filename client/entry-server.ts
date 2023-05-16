import { renderToString } from 'vue/server-renderer';
import { createApp } from './main';

export const render = async (url: string) => {
  const { app, router } = createApp();
  router.push(url);
  await router.isReady();
  const template = await renderToString(app);
  return { template };
};
