# Nestjs_slack_clone

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

인프런의 `Slack 클론 코딩[백엔드 with NestJS + TypeORM]` 강의를 보며 실습한 내용을 저장하는 리포지토리입니다.

### 학습한 내용들은 다음과 같습니다.

- Nest.js

  - Nestjs 기본 세팅 및 [공식 문서](https://docs.nestjs.kr/) 를 바탕으로 Hot Reloading등 기본 개발 환경 세팅
  - Nest CLI를 사용하여 Controller, Service, Module 등을 세팅하고, 의존성 추가하기
  - dotenv, logger 미들웨어 간단히 구현하기
  - Decorator 이용하여 Body, Query, Param 데이터 수신
  - Custom Decorator 사용하여 Request의 User 객체를 편하게 받아오도록 수정
  - Interceptor 를 사용하여 Undefined 값을 일괄 Null로 바꿔주는 기능 추가
  - Swagger 사용하여 API 문서 생성
  - Filter를 사용하여 Http Exception 발생 시 적절한 Response로 일괄 처리
  - Guard 이용하여 인가(Authorization) 구현
  - Parse\*Pipe를 이용하여 입력값의 Type 변환

- TypeORM

  - TypeORM 사용하여 엔티티 추가 및 간단한 Relation 연결
  - [typeorm-seeding](https://www.npmjs.com/package/typeorm-seeding) 이용하여 DB에 Seed값 넣기 (이후 Test 등 개발할 때 유용)
  - TypeORM 사용하여 DB Table과 Entity를 synchronize

- 이외
  - Passport.js 사용하여 기본 로그인 (local) 구현
  - 웹소켓 사용 맛보기
  - CORS Setting, Nest + Multer 맛보기
