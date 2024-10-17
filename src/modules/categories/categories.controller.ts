import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // Query
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
// import { PageOptionsDto } from '../../commons/dto/page-options.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    await this.categoriesService.create(createCategoryDto);
    return { message: 'success' };
  }

  @Get()
  async findAll() {
    return {
      message: 'success',
      data: await this.categoriesService.findAll(),
    };
  }

  // @Get()
  // async findAll(@Query() paginationParams: PageOptionsDto) {
  //   return {
  //     message: 'success',
  //     data: await this.categoriesService.findAll(paginationParams),
  //   };
  // }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const category = await this.categoriesService.findOne(id);
    return {
      message: 'success',
      data: category,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    await this.categoriesService.update(id, updateCategoryDto);
    return { message: 'success' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoriesService.remove(id);
    return { message: 'success' };
  }
}
