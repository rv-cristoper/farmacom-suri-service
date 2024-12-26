import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../schemas/product.schema';
import { Model, Types } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private product: Model<Product>) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const product = new this.product(createProductDto);
      return await product.save();
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException({
          message: 'Product name already exists',
        });
      }
      throw e;
    }
  }

  async findAll() {
    return await this.product
      .aggregate([
        {
          $lookup: {
            from: 'productstocks',
            localField: '_id',
            foreignField: 'productId',
            as: 'stocks',
          },
        },
      ])
      .exec();
  }

  async findOne(id: string) {
    try {
      const product = await this.product.findById(id);
      if (!product) throw new Error();
      const result = await this.product
        .aggregate([
          {
            $match: { _id: new Types.ObjectId(id) },
          },
          {
            $lookup: {
              from: 'productstocks',
              localField: '_id',
              foreignField: 'productId',
              as: 'stocks',
            },
          },
        ])
        .exec();
      return result[0] || null;
    } catch (e) {
      throw new NotFoundException({
        message: 'Product does not exists',
      });
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      return await this.product.findByIdAndUpdate(id, updateProductDto);
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException({
          message: 'Product name already exists',
        });
      }
      throw new NotFoundException({
        message: 'Product does not exists',
      });
    }
  }

  async remove(id: string) {
    try {
      return await this.product.findByIdAndUpdate(id, { isActive: false });
    } catch (e) {
      throw new NotFoundException({
        message: 'Product does not exists',
      });
    }
  }
}
