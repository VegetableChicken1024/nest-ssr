import { Controller, Get, Header, Req } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { routeMap } from './routeMap';
import { renderTemplate } from './vite-server';

const ROUTES_PATH = routeMap;

@Controller(ROUTES_PATH)
export class AppController {
  @Get()
  @Header('Content-Type', 'text/html')
  async renderApp(@Req() request: FastifyRequest): Promise<string> {
    const url = request.url;
    const cookie = request.cookies;
    const persistState: Record<string, any> = {};
    Object.keys(cookie).forEach((key) => {
      if (key.includes('persistState')) {
        const storeId = key.split('-')[1];
        persistState[storeId] = JSON.parse(cookie[key]);
      }
    });
    global.__INITIAL_STATE__ = persistState;
    const template = await renderTemplate(url);
    return template;
  }
}
