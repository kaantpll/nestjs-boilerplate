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
  CacheInterceptor,
  CacheKey,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Roles } from 'src/auth/role.decorator';
import { Role } from 'src/user/models/role.enum';

import { CreateBlogInputDto } from '../dtos/CreateBlogInputDto.dto';
import { UpdateBlogInputDto } from '../dtos/UpdateBlogInputDto.dto';
import { BlogService } from '../services/blog.service';

@Controller('api/v1/blogs')
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.User)
  /*
  @UseInterceptors(CacheInterceptor)
  @CacheKey('user-managment')*/
  async getBlogs() {
    return await this.blogService.getBlogList();
  }

  @Post()
  @HttpCode(201)
  createNewBlog(@Body() blogDto: CreateBlogInputDto) {
    return this.blogService.createNewABlog(blogDto);
  }

  @Get(':id')
  @HttpCode(200)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Roles(Role.User, Role.Admin)
  getBlogById(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.getBlogWithId(id);
  }

  @Put(':id')
  @HttpCode(200)
  updateBlogWithId(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogDto: UpdateBlogInputDto,
  ) {
    return this.blogService.updateBlog(id, updateBlogDto);
  }

  @Delete('id')
  @HttpCode(200)
  deleteBlogById(@Param('id', ParseIntPipe) id: number) {
    this.blogService.deleteById(id);
  }
}
