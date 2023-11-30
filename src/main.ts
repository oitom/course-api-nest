import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // permite apenas as propriedades definidas no dto
    forbidNonWhitelisted: true, // recusa a request e lista as propriedades nao permitidas
    transform: true // ja faz a transformacao auto do tipo de dados enviados na request
  }));

  await app.listen(3000);
}
bootstrap();
