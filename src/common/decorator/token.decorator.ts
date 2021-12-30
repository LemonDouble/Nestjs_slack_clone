import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// response.locals 는 Middleware간 공유가 가능한 로컬 변수
// @Token() token처럼 사용 가능
export const Token = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const response = ctx.switchToHttp().getResponse();
    return response.locals.jwt;
  },
);
