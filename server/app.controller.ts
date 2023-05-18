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
    return renderTemplate(url);
  }
}
