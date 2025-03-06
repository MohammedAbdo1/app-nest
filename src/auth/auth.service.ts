import { Injectable, BadRequestException ,UnauthorizedException} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(payload: any) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: payload.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    // تشفير كلمة المرور
    payload.password = await bcrypt.hash(payload.password, 10);

    // إنشاء المستخدم
    const user = await this.prisma.user.create({
      data: payload,
    });

    // إنشاء توكن JWT
    const token = this.jwtService.sign({
      id: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, access_token: token };
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { sub: user.id, email: user.email, role: user.role };
    return this.jwtService.sign(payload);
  }
}
