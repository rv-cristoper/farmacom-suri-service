import { PaginateModel } from 'mongoose';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PageDto } from '../../commons/dto/page.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private category: PaginateModel<Category>) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const createdCategory = new this.category(createCategoryDto);
      return await createdCategory.save();
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException({
          message: 'Category already exists',
        });
      }

      throw e;
    }
  }

  async findAll() {
    const result = await this.category.paginate(
      {},
      { page: 1, limit: 1, sort: { name: 1 } }
    );
    return new PageDto(result.docs, result.totalDocs);
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
