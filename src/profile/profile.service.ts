import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from './../auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
@Controller('profile')
export class ProfileController {
  @UseGuards(JwtAuthGuard)
  @Get()
  getProfile(@GetUser() user) {
    return user; // إرجاع بيانات المستخدم مباشرة من الديكوريتر
  }

  @UseGuards(JwtAuthGuard)
  @Get('email')
  getUserEmail(@GetUser('email') email: string) {
    return { email }; // إرجاع البريد الإلكتروني فقط
  }
}
