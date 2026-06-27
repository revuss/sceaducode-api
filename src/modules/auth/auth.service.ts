import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { comparePasswords, hashPassword } from '../../lib/auth/password';
import { LoginUserDto } from '../../dto/login-user.dto';
import { JwtService } from '@nestjs/jwt';
import { UserDocument } from '../../schemas/user.schema';
import { plainToInstance } from 'class-transformer';
import { UserResponseDto } from '../../dto/user-response.dto';
import { Response } from 'express';
import { AuthCookieService } from '../auth-cookie/auth-cookie.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly cookieService: AuthCookieService,
  ) {}
  async register(data: CreateUserDto) {
    const exists = await this.usersService.userExistsByEmail(data.email);
    if (exists) {
      throw new ConflictException('User already exists');
    }
    return this.usersService.createUser(data);
  }

  async login(data: LoginUserDto, response: Response) {
    const user = await this.usersService.findByEmail(data.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const passwordMatches = await comparePasswords(
      data.password,
      user.password!,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (user.isDeleted) {
      throw new UnauthorizedException('Account deleted');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('Account disabled');
    }

    const { accessToken, refreshToken } = await this.generateJwtToken(user);

    await this.usersService.updateUser(user.id, {
      refreshToken: await hashPassword(refreshToken),
      lastLoginAt: new Date(),
    });

    this.cookieService.setAuthCookies(response, accessToken, refreshToken);

    return plainToInstance(UserResponseDto, user.toObject(), {
      excludeExtraneousValues: true,
    });
  }

  private async generateJwtToken(user: UserDocument) {
    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_ACCESS_SECRET,
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: process.env.JWT_REFRESH_SECRET,
      expiresIn: '7d',
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
