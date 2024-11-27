import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { SwaggerConfiguration } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, SwaggerConfiguration);
  app.setGlobalPrefix('/api');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )

  app.enableCors({
    origin: process.env.ORIGIN
  });

  SwaggerModule.setup('/api/swagger', app, document);

  await app.listen(process.env.PORT);
}
bootstrap();
