import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../../dto/create-user.dto';
import { ResponseMessage } from '../../common/decorators/response-message.decorator';
import { LoginUserDto } from '../../dto/login-user.dto';
import express from 'express';
import { CurrentUserDecorator } from './decorators/current-user.decorator';
import * as currentUserInterface from '../../common/interfaces/current-user.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ResponseMessage('User registered successfully')
  async register(@Body() data: CreateUserDto) {
    return this.authService.register(data);
  }

  @Post('login')
  @ResponseMessage('User logged in successfully')
  async login(
    @Body() data: LoginUserDto,
    @Res({ passthrough: true }) response: express.Response,
  ) {
    return this.authService.login(data, response);
  }

  @Get('me')
  getMe(@CurrentUserDecorator() user: currentUserInterface.CurrentUser) {
    return user;
  }
}
