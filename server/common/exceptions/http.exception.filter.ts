import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;
    response.status(status).send({
      code: status,
      message: exception.message,
      timestamp: new Date().toISOString(),
      path: ctx.getRequest<FastifyRequest>().url,
    });
  }
}
