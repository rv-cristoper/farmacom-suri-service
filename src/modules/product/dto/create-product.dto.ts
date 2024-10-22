import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
  IsEnum,
  IsInt,
  Min,
  ValidateIf,
  ArrayNotEmpty,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { UnitOfMeasurement } from 'src/commons/enums/unitOfMeasurement.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    example: 'Paracetamol',
    description: 'The name of the product',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value).trim().toLowerCase())
  name: string;

  @ApiProperty({
    example: 'Para dolor de cabeza',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value).trim().toLowerCase())
  @IsOptional()
  description?: string;

  @ApiProperty({
    example: 'Estante 1, tercer nivel',
  })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => String(value).trim().toLowerCase())
  location: string;

  @ApiProperty({
    example: ['photo1.png', 'photo2.png'],
  })
  @IsString({ each: true })
  @IsNotEmpty({
    each: true,
    message: 'Each photo URL must not be an empty string',
  })
  @ArrayNotEmpty({ message: 'Photo array must not be empty' })
  @IsOptional()
  photo?: string[];

  @ApiProperty({
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiProperty({
    example: UnitOfMeasurement.UNITS_PER_BLISTER_PER_BOX,
  })
  @IsEnum(UnitOfMeasurement)
  unitOfMeasurement: UnitOfMeasurement;

  @ApiProperty({
    example: 10,
  })
  @IsInt()
  @Min(1, { message: 'units must be a positive integer greater than zero' })
  units: number;

  @ApiProperty({
    example: 1,
  })
  @IsInt()
  @Min(1, {
    message: 'packageOrBox must be a positive integer greater than zero',
  })
  @ValidateIf(
    (o) =>
      o.unitOfMeasurement === UnitOfMeasurement.UNITS_PER_PACKAGE_OR_BOX ||
      o.unitOfMeasurement === UnitOfMeasurement.UNITS_PER_BLISTER_PER_BOX,
  )
  packageOrBox: number;

  @ApiProperty({
    example: 5,
  })
  @IsInt()
  @Min(1, {
    message: 'blisters must be a positive integer greater than zero',
  })
  @ValidateIf(
    (o) => o.unitOfMeasurement === UnitOfMeasurement.UNITS_PER_BLISTER_PER_BOX,
  )
  blisters: number;
}
