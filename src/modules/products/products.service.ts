import { Injectable, ConflictException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from '../../schemas/product.schema';
import { PaginateModel } from 'mongoose';
// import { PageOptionsDto } from '../../commons/dto/page-options.dto';
// import { PageDto } from '../../commons/dto/page.dto';
// import { CategoriesService } from '../categories/categories.service';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private product: PaginateModel<Product>,
    // private readonly categoriesService: CategoriesService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      // await this.categoriesService.findOne(createProductDto.category);
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

  // async findAll(paginationParams: PageOptionsDto) {
  //   // console.log(paginationParams.query);
  //   // const categories = await this.categoriesService.findIdsByProperty({
  //   //   property: 'names',
  //   //   search: "en",
  //   // })
  //   // console.log(categories)
  //   const result = await this.product.paginate(paginationParams.query, {
  //     ...paginationParams.options,
  //     populate: 'category',
  //   });
  //   return new PageDto(result.docs, result.totalDocs);
  // }

  async findAll() {
    return this.product.find();
  }

  async findOne(id: string) {
    try {
      const product = await this.product.findById(id);
      if (!product) throw new Error();
      return product;
    } catch (e) {
      throw new ConflictException({
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
      throw new ConflictException({
        message: 'Product does not exists',
      });
    }
  }

  async remove(id: string) {
    try {
      return await this.product.findByIdAndUpdate(id, { isActive: false });
    } catch (e) {
      throw new ConflictException({
        message: 'Product does not exists',
      });
    }
  }
}
