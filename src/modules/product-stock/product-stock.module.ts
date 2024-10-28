import { Module } from '@nestjs/common';
import { ProductStockService } from './product-stock.service';
import { ProductStockController } from './product-stock.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductStock,
  ProductStockSchema,
} from '../../schemas/product-stock.schema';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductStock.name, schema: ProductStockSchema },
    ]),
    ProductModule,
  ],
  controllers: [ProductStockController],
  providers: [ProductStockService],
})
export class ProductStockModule {}
