import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import session from 'express-session';
import path from 'path';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception-filter/http-exception-filter';
import { NestExpressApplication } from '@nestjs/platform-express';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const port = process.env.PORT || 3000;

  // exception Filter 등록
  app.useGlobalFilters(new HttpExceptionFilter());

  // validation Pipe 등록 (class-validator)
  app.useGlobalPipes(new ValidationPipe());

  // 아래와 같이 사용시 ParseInt등 사용하지 않아도 type에 맞춰 준다. (npm i class-transformer)
  /*
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  */

  // static serve 폴더 적용
  console.log('static foler: ', path.join(__dirname, '..', 'uploads'));
  app.useStaticAssets(path.join(__dirname, '..', 'uploads'), {
    prefix: '/uploads',
  });

  app.enableCors({
    origin: 'http://localhost:3090',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTION',
    credentials: true,
  });

  // Swagger API 사용 설정
  const config = new DocumentBuilder()
    .setTitle('Sleact API')
    .setDescription('Sleact 개발을 위한 API 문서입니다')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(cookieParser());
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
      },
    }),
  );
  // passport.js 사용 설정
  app.use(passport.initialize());
  app.use(passport.session());

  // Hot Reloading 사용 설정
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  console.log(`Listening on port ${port}`);
  await app.listen(port);
}
bootstrap();
