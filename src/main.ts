import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionInterceptor } from './commons/interceptors/http-exception.interceptor';
import { setUpSwagger } from './utils/set-up-swagger';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });

  app.setGlobalPrefix('api/v1');

  app.useGlobalInterceptors(new HttpExceptionInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  if (configuration().nodeEnv !== 'production') setUpSwagger(app);

  await app.listen(configuration().port);
}
bootstrap();
