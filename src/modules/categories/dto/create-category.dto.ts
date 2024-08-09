import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => String(value).trim().toLowerCase())
    name: string;

    @IsBoolean()
    @IsOptional()
    isActive: boolean = true;
}
