import { Injectable } from '@nestjs/common';
import { CreateProductStockDto } from './dto/create-product-stock.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';
import { InjectModel } from '@nestjs/mongoose';
import { ProductStock } from '../../schemas/product-stock.schema';
import { Model, Types } from 'mongoose';
import { ProductService } from '../product/product.service';

@Injectable()
export class ProductStockService {
  constructor(
    @InjectModel(ProductStock.name) private productStock: Model<ProductStock>,
    private readonly product: ProductService,
  ) {}
  async create(createProductStockDto: CreateProductStockDto) {
    try {
      await this.product.findOne(createProductStockDto.productId);
      const productStockByExpirationDate = await this.productStock.findOne({
        productId: new Types.ObjectId(createProductStockDto.productId),
        expirationDate: createProductStockDto.expirationDate,
      });
      if (productStockByExpirationDate) {
        productStockByExpirationDate.stock += createProductStockDto.stock;
        return await productStockByExpirationDate.save();
      }
      return await new this.productStock({
        ...createProductStockDto,
        productId: new Types.ObjectId(createProductStockDto.productId),
      }).save();
    } catch (e) {
      throw e;
    }
  }

  async findAll() {
    return this.productStock.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} productStock`;
  }

  update(id: number, updateProductStockDto: UpdateProductStockDto) {
    return `This action updates a #${id} productStock`;
  }

  remove(id: number) {
    return `This action removes a #${id} productStock`;
  }
}
