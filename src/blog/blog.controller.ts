import {
  Controller,
  Get,
  Body,
  Param,
  Post,
  HttpCode,
  ParseIntPipe,
  Put,
  Delete,
  UseInterceptors,
  UseGuards,
  Headers,
  CacheInterceptor,
  CacheKey,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/user/entities/role.enum';

import { CreateBlogInputDto } from './dtos/create';
import { UpdateBlogInputDto } from './dtos/update';
import { BlogService } from './blog.service';
/*
@UseGuards(JwtAuthGuard, RoleGuard)
@Roles(Role.User, Role.Admin)*/
@Controller('api/v1/blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  @HttpCode(200)
  async getList() {
    return await this.blogService.getList();
  }

  @Post()
  @HttpCode(201)
  async create(@Body() blogDto: CreateBlogInputDto, @Headers() headers) {
    return await this.blogService.create(blogDto, headers.authorization);
  }

  @Get(':id')
  @HttpCode(200)
  async getById(@Param('id', ParseIntPipe) id: number) {
    return await this.blogService.getById(id);
  }

  @Put(':id')
  @HttpCode(204)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogInputDto,
  ) {
    await this.blogService.update(id, updateBlogDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id', ParseIntPipe) id: number) {
    await this.blogService.delete(id);
  }
}
