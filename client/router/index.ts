import {
  createRouter as _createRouter,
  createMemoryHistory,
  createWebHistory,
} from 'vue-router';

// @ts-ignore
const pages = import.meta.glob('../pages/*.vue');
const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\.\/pages\/(.*)\.vue$/)?.[1].toLowerCase() || '';
  const routePath = name === 'home' ? '/' : `/${name}`;
  return { path: routePath, component: pages[path], name };
});

export const createRouter = () => {
  return _createRouter({
    // @ts-ignore
    history: import.meta.env.SSR ? createMemoryHistory() : createWebHistory(),
    routes,
  });
};
