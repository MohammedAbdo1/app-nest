import { Controller,Get,UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { GetUser } from 'src/auth/get-user.decorator';
@Controller('profile')
export class ProfileController {
    @UseGuards(JwtAuthGuard)
    @Get()
    getProfile(@GetUser() user) {
      return user; // إرجاع بيانات المستخدم مباشرة من الديكوريتر
    }
}