import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  async findOne(id: string) {
    try {
      return await this.productStock.findById(id);
    } catch (e) {
      throw new NotFoundException({
        message: 'Product stock does not exists',
      });
    }
  }

  async update(id: string, updateProductStockDto: UpdateProductStockDto) {
    try {
      return await this.productStock.findByIdAndUpdate(
        id,
        updateProductStockDto,
      );
    } catch (e) {
      throw new NotFoundException({
        message: 'Product stock does not exists',
      });
    }
  }

  async remove(id: string) {
    try {
      const productStock = await this.findOne(id);
      if (productStock!.stock > 0)
        throw new BadRequestException(
          'Cannot delete product with stock greater than zero',
        );
      await this.productStock.findByIdAndDelete(id);
    } catch (e) {
      if (e.status === 404) throw e;
      throw new ConflictException({
        message: e.message,
      });
    }
  }
}
