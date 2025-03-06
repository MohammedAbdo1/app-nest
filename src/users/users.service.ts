import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './create-user.dto';
import { SignupResponse } from './users';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}
  async create(payload: CreateUserDto): Promise<SignupResponse> {
    console.log('Payload received:', payload);
    // const existingUser = await this.prisma.user.findFirst({
    //   where: {
    //     email: payload.email,
    //   },
    // });
    // if (existingUser) {
    //   throw new BadRequestException(
    //     'User created with the email you provided',
    //     {
    //       cause: new Error(),
    //       description: 'user is already registered',
    //     },
    //   );
    // }
    const hash = await this.encryptPassword(payload.password, 10);
    payload.password = hash;
    return await this.prisma.user.create({
      data: payload,
      select: {
        email: true,
        id: true,
      },
    });
  }

  async encryptPassword(plainText, saltRounds) {
    return await bcrypt.hash(plainText, saltRounds);
  }
}