import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('product')
@ApiTags('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiBody({ type: CreateProductDto })
  async create(@Body() createProductDto: CreateProductDto) {
    await this.productService.create(createProductDto);
    return { message: 'success' };
  }

  @Get()
  async findAll() {
    return {
      message: 'success',
      data: await this.productService.findAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productService.findOne(id);
    return {
      message: 'success',
      data: product,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.productService.update(id, updateProductDto);
    return { message: 'success' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productService.remove(id);
    return { message: 'success' };
  }
}
