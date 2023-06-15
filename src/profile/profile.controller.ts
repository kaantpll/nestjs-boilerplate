import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { LocalAuthGuard } from 'src/auth/guards/localAuth.guard';
import { CreateProfileInputDto } from './dto/create';
import { ProfileService } from './profile.service';

@Controller('api/v1/profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  @HttpCode(201)
  async createProfile(@Body() profileDto: CreateProfileInputDto) {
    return await this.profileService.create(profileDto);
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.profileService.getOne(id);
  }
}
