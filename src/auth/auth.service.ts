import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignupDto, SigninDto } from './dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async signup(dto: SignupDto) {
    // Check if user already exists
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: dto.email },
          { username: dto.username }
        ]
      }
    });

    if (existingUser) {
      throw new ConflictException('User with this email or username already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(dto.password, salt);

    try {
      const user = await this.prisma.user.create({
        data: {
          name: dto.name,
          username: dto.username,
          email: dto.email,
          password: hash,
        },
        select: {
          id: true,
          name: true,
          username: true,
          email: true,
          createdAt: true,
        }
      });

      return {
        message: 'User registration successful',
        user,
        access_token: this.generateToken(user.id)
      };
    } catch (error) {
      throw new Error(`User registration failed: ${error.message}`);
    }
  }

  async signin(dto: SigninDto) {
    const user = await this.validateUser(dto.email, dto.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return {
      message: 'Login successful',
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
      access_token: this.generateToken(user.id)
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (user){
const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch){
      const { password: _, ...result } = user;
      return result;
    }
  }
    return null;
  }

  private generateToken(userId: number): string {
    const jwtSecret = this.configService.get<string>('JWT_SECRET');
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    const payload = {
      sub: userId,
      iat: Math.floor(Date.now() / 1000)
    };

    return this.jwtService.sign(payload, {
      secret: jwtSecret,
      expiresIn: '24h',
    });
  }
}
