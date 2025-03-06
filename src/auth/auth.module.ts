import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service'; // استيراد خدمة المستخدمين
import { PrismaService } from '../prisma.service'; // استيراد PrismaService
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ProfileController } from 'src/profile/profile.service';

@Module({
  imports: [
  PassportModule.register({
      defaultStrategy: 'jwt',
      secret: process.env.JWT_SECRET || 'your-secret-key', // استخدم متغير بيئة للمفتاح السري
      signOptions: { expiresIn: '1h' }, // مدة صلاحية التوكن
    }),
  ],
  providers: [AuthService, UsersService, PrismaService,JwtStrategy],
  exports: [AuthService],
  controllers: [AuthController,ProfileController]
})
export class AuthModule {}
