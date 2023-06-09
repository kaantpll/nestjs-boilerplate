import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/db/database.module';
import { UserModule } from 'src/user/user.module';
import { BlogController } from './blog.controller';
import { blogProviders } from './services/blog.provider';
import { BlogService } from './services/blog.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [DatabaseModule, UserModule, AuthModule],
  providers: [...blogProviders, BlogService],
  controllers: [BlogController],
})
export class BlogModule {}
