import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsArray } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => String(value).trim().toLowerCase())
    name: string;

    @IsString()
    @Transform(({ value }) => String(value).trim().toLowerCase())
    @IsOptional()
    description?: string = '';

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => String(value).trim().toLowerCase())
    location: string;

    @IsString({ each: true })
    @IsOptional()
    photo?: string[] = [];

    @IsBoolean()
    @IsOptional()
    isActive?: boolean = true;

    @IsString()
    @IsNotEmpty()
    category: string;
}
