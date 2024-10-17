import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  // Query,
  // UsePipes,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// import { NotEmptyBodyPipe } from 'src/commons/pipes/not-empty-body.pipe';
// import { PageOptionsDto } from '../../commons/dto/page-options.dto';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    await this.productsService.create(createProductDto);
    return { message: 'success' };
  }

  // @Get()
  // async findAll(@Query() paginationParams: PageOptionsDto) {
  //   return {
  //     message: 'success',
  //     data: await this.productsService.findAll(paginationParams),
  //   };
  // }

  @Get()
  async findAll() {
    return {
      message: 'success',
      data: await this.productsService.findAll(),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const product = await this.productsService.findOne(id);
    return {
      message: 'success',
      data: product,
    };
  }

  @Patch(':id')
  // @UsePipes(NotEmptyBodyPipe)
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    await this.productsService.update(id, updateProductDto);
    return { message: 'success' };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.productsService.remove(id);
    return { message: 'success' };
  }
}
