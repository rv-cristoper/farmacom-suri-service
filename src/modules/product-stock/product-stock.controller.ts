import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductStockService } from './product-stock.service';
import { CreateProductStockDto } from './dto/create-product-stock.dto';
import { UpdateProductStockDto } from './dto/update-product-stock.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('product-stock')
export class ProductStockController {
  constructor(private readonly productStockService: ProductStockService) {}

  @Post()
  @ApiBody({ type: CreateProductStockDto })
  async create(@Body() createProductStockDto: CreateProductStockDto) {
    await this.productStockService.create(createProductStockDto);
    return { message: 'success' };
  }

  @Get()
  async findAll() {
    return {
      message: 'success',
      data: await this.productStockService.findAll(),
    };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productStockService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductStockDto: UpdateProductStockDto,
  ) {
    return this.productStockService.update(+id, updateProductStockDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productStockService.remove(+id);
  }
}
