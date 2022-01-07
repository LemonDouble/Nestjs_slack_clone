import { createParamDecorator, ExecutionContext } from '@nestjs/common';

// User라는 Custom Decorator 만듦, 그리고 해당 데코레이터 통해 request.user를 가져올 수 있게 함
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
