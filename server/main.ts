import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { isProduction, resolveDistPath } from './utils';
import { createViteServer } from './vite-server';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  if (isProduction) {
    app.useStaticAssets(resolveDistPath('client'), { index: false });
    app.use(compression());
  } else {
    const viteServer = await createViteServer();
    app.use(viteServer.middlewares);
  }
  await app.listen(3000);
}
bootstrap();
