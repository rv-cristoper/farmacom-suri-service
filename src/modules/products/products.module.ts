import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../../schemas/product.schema';
import { Category, CategorySchema } from '../../schemas/category.schema';
import { CategoriesService } from '../categories/categories.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema },
    ])
  ],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    CategoriesService,
  ],
})
export class ProductsModule { }
