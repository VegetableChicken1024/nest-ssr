import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor'; // 全局拦截器
import { isProduction, resolveDistPath } from './utils';
import { createViteServer } from './vite-server';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalInterceptors(new TransformInterceptor()); // 全局拦截器
  app.useGlobalFilters(new AllExceptionFilter(), new HttpExceptionFilter()); // 全局异常过滤器
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
