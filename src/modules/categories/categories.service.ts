import { PaginateModel } from 'mongoose';
import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from '../../schemas/category.schema';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PageDto } from '../../commons/dto/page.dto';
import { PageOptionsDto } from '../../commons/dto/page-options.dto';

@Injectable()
export class CategoriesService {
  constructor(@InjectModel(Category.name) private category: PaginateModel<Category>) { }

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = new this.category(createCategoryDto);
      return await category.save();
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException({
          message: 'Category name already exists',
        });
      }
      throw e;
    }
  }

  async findAll(paginationParams: PageOptionsDto) {
    const result = await this.category.paginate(
      paginationParams.query,
      paginationParams.options,
    );
    return new PageDto(result.docs, result.totalDocs);
  }

  async findOne(id: string) {
    try {
      const category = await this.category.findById(id)
      if (!category) throw new Error();
      return category;
    } catch (e) {
      throw new ConflictException({
        message: 'Category does not exists',
      });
    }
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    try {
      return await this.category.findByIdAndUpdate(id, updateCategoryDto)
    } catch (e) {
      if (e.code === 11000) {
        throw new ConflictException({
          message: 'Category name already exists',
        });
      }
      throw new ConflictException({
        message: 'Category does not exists',
      });
    }
  }

  async remove(id: string) {
    try {
      const category = await this.category.findByIdAndDelete(id)
      if (!category) throw new Error();
      return category;
    } catch (e) {
      throw new ConflictException({
        message: 'Category does not exists',
      });
    }
  }
}
