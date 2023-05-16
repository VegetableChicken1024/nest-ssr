import type { ViteDevServer } from 'vite';
import { createServer } from 'vite';
import { resolveClientPath } from './utils/resolve-path';
let viteServer: ViteDevServer;

export const createViteServer = async ({ force } = { force: false }) => {
  if (!viteServer || force) {
    viteServer = await createServer({
      publicDir: resolveClientPath('public'),
      server: { middlewareMode: true },
      appType: 'custom',
    });
  }
  return viteServer;
};
