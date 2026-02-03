/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ResponseFilter implements ExceptionFilter {
  public catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();
    let code = HttpStatus.INTERNAL_SERVER_ERROR;

    const meta: any = {
      code,
      status: 'error',
      message: 'A problem with our server, please try again later',
      errors: null,
    };

    if (
      exception instanceof BadRequestException ||
      exception instanceof HttpException
    ) {
      code = exception.getStatus();
      const errorResponse: any = exception.getResponse();

      meta.code = code;
      meta.message =
        typeof errorResponse === 'string'
          ? errorResponse
          : errorResponse?.message;
      meta.errors = errorResponse;
    } else if (exception instanceof Error) {
      meta.message = exception.message;
      meta.errors = exception;
    }
    response.status(code).send(meta);
  }
}
