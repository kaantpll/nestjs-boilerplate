import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  HttpCode,
  Put,
  Delete,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes';
import { LocalAuthGuard } from 'src/auth/guards/localAuth.guard';
import { CreateProfileInputDto } from './dto/create';
import { ProfileService } from './profile.service';

@Controller('api/v1/profiles')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Get()
  @HttpCode(200)
  async getList() {
    return await this.profileService.getList();
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.profileService.getOne(id);
  }

  @Post()
  @HttpCode(201)
  async createProfile(@Body() profileDto: CreateProfileInputDto) {
    return await this.profileService.create(profileDto);
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() profileDto: CreateProfileInputDto,
  ) {
    return await this.profileService.update(id, profileDto);
  }

  @Delete(':id')
  @HttpCode(200)
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.profileService.delete(id);
  }
}
