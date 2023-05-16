import { Controller, Get, Header, Req } from '@nestjs/common';
import type { Request } from 'express';
import { readFileSync, readdirSync } from 'fs';
import { resolveClientPath } from './utils/resolve-path';
import { createViteServer } from './vite-server';
const TEMPLATE_PLACEHOLDER = '<!-- template-placeholder -->';
const ROUTES_PATH = readdirSync(resolveClientPath('pages'), {
  encoding: 'utf-8',
})
  .filter((path) => /\.vue$/.test(path))
  .map((path) => {
    const name = path.match(/(.*)\.vue$/)[1].toLowerCase() || '';
    const routePath = name === 'home' ? '/' : `/${name}`;
    return routePath;
  });

@Controller(ROUTES_PATH)
export class AppController {
  @Get()
  @Header('Content-Type', 'text/html')
  async renderApp(@Req() request: Request): Promise<string> {
    const url = request.originalUrl;
    const vite = await createViteServer();
    const html = await vite.transformIndexHtml(
      url,
      readFileSync(resolveClientPath('index.html'), { encoding: 'utf-8' }),
    );
    const { render } = await vite.ssrLoadModule(
      resolveClientPath('entry-server.ts'),
    );
    const { template } = await render(url);
    return html.replace(TEMPLATE_PLACEHOLDER, template);
  }
}
