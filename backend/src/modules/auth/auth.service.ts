import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,

    private readonly jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const existingEmail = await this.usersService.findByEmail(
      dto.email,
    );

    if (existingEmail) {
      throw new BadRequestException(
        'Email is already in use',
      );
    }

    const existingUsername =
      await this.usersService.findByUsername(
        dto.username,
      );

    if (existingUsername) {
      throw new BadRequestException(
        'Username is already in use',
      );
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.usersService.createUser({
      email: dto.email,
      username: dto.username,
      passwordHash,
    });

    const accessToken = await this.generateAccessToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
  }

  async login(dto: LoginDto) {
    const user = await this.usersService.findByEmail(
      dto.email,
    );

    if (!user) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const passwordMatches = await bcrypt.compare(
      dto.password,
      user.passwordHash,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException(
        'Invalid credentials',
      );
    }

    const accessToken = await this.generateAccessToken({
      id: user.id,
      email: user.email,
      username: user.username,
    });

    return {
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
    };
  }

  async generateAccessToken(payload: {
    id: string;
    email: string;
    username: string;
  }) {
    return this.jwtService.signAsync({
      sub: payload.id,
      email: payload.email,
      username: payload.username,
    });
  }
}
