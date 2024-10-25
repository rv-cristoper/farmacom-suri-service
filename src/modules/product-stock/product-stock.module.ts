import { Module } from '@nestjs/common';
import { ProductStockService } from './product-stock.service';
import { ProductStockController } from './product-stock.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  ProductStock,
  ProductStockSchema,
} from '../../schemas/product-stock.schema';
// import { ProductModule } from '../product/product.module';
// import { Product, ProductSchema } from '../../schemas/product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductStock.name, schema: ProductStockSchema },
      // { name: Product.name, schema: ProductSchema },
    ]),
    // ProductModule,
  ],
  controllers: [ProductStockController],
  providers: [ProductStockService],
  exports: [MongooseModule],
})
export class ProductStockModule {}
