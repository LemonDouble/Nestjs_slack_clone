import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    // 아래 2개 Line은 Router가 시작할때 기록된다!
    const { ip, method, originalUrl } = request;
    const userAgent = request.get('user-agent') || '';

    // router가 finish 될 때 이 Logger가 호출된다! (비동기)
    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');
      this.logger.log(
        `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
      );
    });

    // Express처럼 다음 Middleware 불러준다 (혹은 Router)
    next();
  }
}
