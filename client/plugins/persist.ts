import Cookies from 'js-cookie';
import { PiniaPluginContext } from 'pinia';
export const persistPlugin = (context: PiniaPluginContext) => {
  const {
    options: { persist },
    store,
  } = context;
  if (!persist) return;
  persist.paths.forEach((item) => {
    // @ts-ignore
    const persistValue = import.meta.env.SSR
      ? global.__INITIAL_STATE__[store.$id]?.[item] ?? ''
      : JSON.parse(Cookies.get(`persistState-${store.$id}`) ?? '{}')[item];
    persistValue &&
      (store[item] =
        typeof persistValue === 'string'
          ? JSON.parse(persistValue)
          : persistValue);
  });
  // @ts-ignore
  import.meta.env.SSR ||
    store.$subscribe(({ storeId }, state) => {
      const map: Record<string, any> = {};
      persist.paths.map((item) => {
        map[item] = state[item];
      });
      Cookies.set(`persistState-${storeId}`, JSON.stringify(map));
    });
};
