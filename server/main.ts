import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { createViteServer } from './vite-server';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const viteServer = await createViteServer();
  app.use(viteServer.middlewares);
  await app.listen(3000);
}
bootstrap();
