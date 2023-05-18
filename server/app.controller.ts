import {
  Controller,
  Get,
  Header,
  InternalServerErrorException,
  Req,
} from '@nestjs/common';
import type { Request } from 'express';
import { readFileSync } from 'fs';
import type { ViteDevServer } from 'vite';
import { isProduction, resolveClientPath, resolveDistPath } from './utils';
import { createViteServer } from './vite-server';

const TEMPLATE_PLACEHOLDER = '<!-- template-placeholder -->';
const INITIAL_STATE_PLACEHOLDER = "'<!-- initial-state-placeholder -->'";
const ROUTES_PATH = ['/', '/about'];

@Controller(ROUTES_PATH)
export class AppController {
  @Get()
  @Header('Content-Type', 'text/html')
  async renderApp(@Req() request: Request): Promise<string> {
    const url = request.originalUrl;
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
        render = (
          await vite.ssrLoadModule(resolveClientPath('entry-server.ts'))
        ).render;
      }
      const { template, initialState } = await render(url);
      return html
        .replace(TEMPLATE_PLACEHOLDER, template)
        .replace(INITIAL_STATE_PLACEHOLDER, JSON.stringify(initialState));
    } catch (error) {
      vite && vite.ssrFixStacktrace(error);
      throw new InternalServerErrorException(error);
    }
  }
}
