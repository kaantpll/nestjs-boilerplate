import { Controller, Post, Body, HttpCode } from '@nestjs/common';

import { LoginUserDto } from './dto/login';
import { RegisterUserDto } from './dto/register';

import { AuthService } from './auth.service';

@Controller('api/v1/auth/')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    return await this.authService.login(loginUserDto);
  }

  @Post('register')
  @HttpCode(201)
  async register(@Body() registerDto: RegisterUserDto) {
    return await this.authService.register(registerDto);
  }
}
