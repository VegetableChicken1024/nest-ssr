import { VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/exceptions/base.exception.filter';
import { HttpExceptionFilter } from './common/exceptions/http.exception.filter';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { isProduction, resolveDistPath } from './utils';
import { createViteServer } from './vite-server';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.useGlobalInterceptors(new TransformInterceptor()); // 全局拦截器
  app.useGlobalFilters(new AllExceptionFilter(), new HttpExceptionFilter()); // 全局异常过滤器
  if (isProduction) {
    app.useStaticAssets({
      root: resolveDistPath('client'),
      index: false,
    });
    app.use(compression());
  } else {
    const viteServer = await createViteServer();
    app.use(viteServer.middlewares);
  }
  await app.listen(3000);
}
bootstrap();
