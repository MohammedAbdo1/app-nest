import { Controller, Post, Body, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { UsersService } from './users.service';
import { AuthGuard } from './guard/Auth.guard';
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe()) // ✅ تفعيل الفاليديشن هنا
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }
}
