import { 
  IsEmail, 
  IsNotEmpty, 
  MinLength, 
  MaxLength, 
  IsOptional, 
  IsEnum, 
  IsBoolean, 
  IsInt, 
  Matches 
} from 'class-validator';
import { Role, Gender } from '@prisma/client'; // استيراد الـ Enums من Prisma

export class CreateUserDto {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  role: Role;

  @IsOptional()
  avatar?: string;

  @IsOptional()
  @IsInt()
  age?: number;

  @IsOptional()
  @Matches(/^01[0-9]{9}$/, { message: 'رقم الهاتف غير صالح، يجب أن يكون رقمًا  مكونًا من 11 رقمًا' })
  phoneNumber?: string;

  @IsOptional()
  address?: string;

  @IsBoolean()
  active: boolean;

  @IsNotEmpty()
  verificationCode: string;

  @IsEnum(Gender)
  gender: Gender;
}
