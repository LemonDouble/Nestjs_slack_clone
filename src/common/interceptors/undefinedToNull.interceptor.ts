// Controller 다음 어떤 작업을 할지? response를 마지막으로 공통적으로 조작하거나 하는 경우...
// 예시 : controller의 response를 {message : "success", >payload< : "success"} 형태로 보내고 싶다거나...
// 물론 Spring 인터셉터처럼 Controller 전에도 실행이 가능하다.

import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Controller 가기 전은 여기에 작성

    return next
      .handle()
      .pipe(map((data) => (data === undefined ? null : data)));
    // 위는 Controller 간 후,
    // json에 undefined 들어가면 error 날 수 있다. 따라서 null로 치환해주는 interceptor
    // map은 rxjs에서 사용되는 map이다.
  }
}
