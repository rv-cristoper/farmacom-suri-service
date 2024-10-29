import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateProductStockDto } from './create-product-stock.dto';
import { IsInt, Min } from 'class-validator';

export class UpdateProductStockDto extends PartialType(
  OmitType(CreateProductStockDto, ['productId']),
) {
  @IsInt()
  @Min(0, {
    message: 'stock must be a positive integer greater than or equal to zero',
  })
  stock: number;
}
