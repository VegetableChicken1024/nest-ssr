import { InternalServerErrorException } from '@nestjs/common';
import { readFileSync } from 'fs';
import type { ViteDevServer } from 'vite';
import { createServer } from 'vite';
import { isProduction } from './utils';
import { resolveClientPath, resolveDistPath } from './utils/resolve-path';
let viteServer: ViteDevServer;
const TEMPLATE_PLACEHOLDER = '<!-- template-placeholder -->';
const INITIAL_STATE_PLACEHOLDER = "'<!-- initial-state-placeholder -->'";

export const createViteServer = async ({ force } = { force: false }) => {
  if (!viteServer || force) {
    viteServer = await createServer({
      publicDir: resolveClientPath('public'),
      server: { middlewareMode: 'ssr' },
    });
  }
  return viteServer;
};

export const renderTemplate = async (url: string) => {
  let vite: ViteDevServer;
  let html: string;
  let render: (
    url: string,
  ) => Promise<{ template: string; initialState: object }>;
  try {
    if (isProduction) {
      html = readFileSync(resolveDistPath('client', 'index.html'), {
        encoding: 'utf-8',
      });
      render = (await import(resolveDistPath('server', 'entry-server.js')))
        .render;
    } else {
      vite = await createViteServer();
      html = await vite.transformIndexHtml(
        url,
        readFileSync(resolveClientPath('index.html'), { encoding: 'utf-8' }),
      );
      render = (await vite.ssrLoadModule(resolveClientPath('entry-server.ts')))
        .render;
    }
    const { template, initialState } = await render(url);
    return html
      .replace(TEMPLATE_PLACEHOLDER, template)
      .replace(INITIAL_STATE_PLACEHOLDER, JSON.stringify(initialState));
  } catch (error) {
    vite && vite.ssrFixStacktrace(error);
    throw new InternalServerErrorException(error);
  }
};
