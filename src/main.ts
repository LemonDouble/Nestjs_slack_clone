import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import passport from 'passport';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exception-filter/http-exception-filter';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;

  // exception Filter 등록
  app.useGlobalFilters(new HttpExceptionFilter());

  // validation Pipe 등록 (class-validator)
  app.useGlobalPipes(new ValidationPipe());

  // Swagger API 사용 설정
  const config = new DocumentBuilder()
    .setTitle('Sleact API')
    .setDescription('Sleact 개발을 위한 API 문서입니다')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

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
