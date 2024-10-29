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
  async findOne(@Param('id') id: string) {
    const productStock = await this.productStockService.findOne(id);
    return {
      message: 'success',
      data: productStock,
    };
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductStockDto: UpdateProductStockDto,
  ) {
    await this.productStockService.update(id, updateProductStockDto);
    return { message: 'success' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productStockService.remove(id);
    return { message: 'success' };
  }
}
