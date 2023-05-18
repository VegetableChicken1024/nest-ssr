import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Observable, map } from 'rxjs';
import { routeMap } from '../../routeMap';

interface Response<T> {
  data: T;
}
@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    // 忽略部分接口
    const ignorePaths = routeMap;
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const url = request.url;
    if (ignorePaths.includes(url)) return next.handle();
    return next.handle().pipe(
      map((data) => ({
        code: 200,
        message: 'success',
        data,
        path: url,
        timestamp: new Date().toISOString(),
      })),
    );
  }
}
