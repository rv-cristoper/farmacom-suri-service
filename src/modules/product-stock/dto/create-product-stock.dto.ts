import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsNotEmpty,
  Min,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'isFutureDate', async: false })
export class IsFutureDate implements ValidatorConstraintInterface {
  validate(date: Date) {
    const today = new Date();
    const todayFormatted = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
    );
    return date >= todayFormatted;
  }

  defaultMessage() {
    return 'expirationDate must be greater than or equal to today';
  }
}

export class CreateProductStockDto {
  @ApiProperty({
    example: '6717def1ece8660a45a0cb01',
  })
  @IsNotEmpty()
  productId: string;

  @ApiProperty({
    example: 100,
  })
  @IsInt()
  @Min(1, { message: 'stock must be a positive integer greater than zero' })
  stock: number;

  @ApiProperty({
    example: '2024-12-29',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Validate(IsFutureDate)
  expirationDate: Date;
}
