import { IsString, IsNotEmpty } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    @Transform(({ value }: { value: string }) => value.toLowerCase())
    name: string;
}
