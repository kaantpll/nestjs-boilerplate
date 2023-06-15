import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { BlogController } from './blog.controller';
import { Blog } from './blog.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BlogService } from './blog.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog]), UserModule, AuthModule],
  providers: [BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
