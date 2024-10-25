import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ProductModule } from './modules/product/product.module';
import { DatabaseModule } from './modules/database/database.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionInterceptor } from './commons/interceptors/http-exception.interceptor';
import { ProductStockModule } from './modules/product-stock/product-stock.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    DatabaseModule,
    ProductModule,
    ProductStockModule,
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
