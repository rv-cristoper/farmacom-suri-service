import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsMongoId,
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
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }

  defaultMessage() {
    return 'expirationDate must be greater than or equal to today';
  }
}

export class CreateProductStockDto {
  @ApiProperty({
    example: '60c72b2f9b1e8e4d88fcd78a',
  })
  @IsNotEmpty()
  @IsMongoId()
  product: string;

  @ApiProperty({
    example: 100,
  })
  @IsInt()
  @Min(1, { message: 'stock must be a positive integer greater than zero' })
  stock: number;

  @ApiProperty({
    example: '2024-12-31T00:00:00.000Z',
  })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @Validate(IsFutureDate)
  expirationDate: Date;
}
