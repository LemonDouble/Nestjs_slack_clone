import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

// Response 객체는 express의 Response이다. (nestjs나 다른 response와 헷갈리지 않도록..)
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // ctx = context
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    // as : typescript 문법, err의 type을 string 혹은 아래 객체 모양으로 보겠다는 뜻
    const err = exception.getResponse() as
      | string
      | { error: string; statusCode: 400; message: string[] }; // class-validator type

    // class-validator가 자동으로 발생시킨 error
    if (typeof err !== 'string' && err.error === 'Bad Request') {
      return response.status(status).json({
        success: false,
        code: status,
        data: err.message,
      });
    }

    // 내가 code 내에서 작성시킨 error (throw new HttpException... 같은거)
    response.status(status).json({
      success: false,
      code: status,
      data: err,
    });
  }
}
