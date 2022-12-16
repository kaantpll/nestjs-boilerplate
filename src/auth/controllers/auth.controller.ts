import { Controller, Post, UseGuards, Body,HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from '../dtos/LoginUserDto.dto';
import { RegisterUserDto } from '../dtos/RegisterUserDto.dto';
import { LocalAuthGuard } from '../guards/localAuth.guard';
import { AuthService } from '../services/auth.service';

@Controller('api/v1/auth/')
export class AuthController {

    constructor(private authService: AuthService) {}

    @Post('login')
    @HttpCode(200)
    login(@Body() loginUserDto:LoginUserDto){
     return this.authService.login(loginUserDto);
    }

    @Post('register')
    @HttpCode(201)
    register(@Body() registerDto:RegisterUserDto){
     return this.authService.register(registerDto)
    }

}