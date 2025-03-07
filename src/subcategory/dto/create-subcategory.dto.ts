import { IsNotEmpty, IsString, MinLength, MaxLength, IsInt } from 'class-validator';

export class CreateSubCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsInt()
  @IsNotEmpty()
  categoryId: number;
}
