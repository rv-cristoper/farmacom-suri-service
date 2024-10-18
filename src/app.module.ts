import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './modules/products/products.module';
import { DatabaseModule } from './modules/database/database.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionInterceptor } from './commons/interceptors/http-exception.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    DatabaseModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useValue: new HttpExceptionInterceptor(),
    },
  ],
})
export class AppModule {}
