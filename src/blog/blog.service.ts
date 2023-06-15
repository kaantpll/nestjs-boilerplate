import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BLOG_REPOSITORY } from 'src/shared/constants/general';
import { Repository } from 'typeorm';
import { Blog } from './blog.entity';
import { CreateBlogType, UpdateBlogType } from 'src/shared/types/blog';
import { AuthService } from 'src/auth/auth.service';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog) private blogRepository: Repository<Blog>,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async getList() {
    return await this.blogRepository.find();
  }

  async create(data: CreateBlogType, accessToken: string) {
    const { content, title } = data;

    const userId = this.authService.decodejwt(accessToken);

    const user = await this.userService.getById(userId);

    let blog = new Blog();

    blog = {
      ...blog,
      content,
      title,
      user,
    };

    await this.blogRepository.insert(blog);

    return blog;
  }

  async getById(id: number) {
    const blog = await this.blogRepository.findOneBy({ id });

    if (!blog) throw new NotFoundException(BLOG.NOT_FOUND);

    return blog;
  }

  async delete(id: number) {
    const deleted = await this.blogRepository.delete({ id });

    if (!deleted.affected) throw new NotFoundException(BLOG.NOT_FOUND);
  }

  async update(id: number, data: UpdateBlogType) {
    const updateBlog = await this.blogRepository.update(id, data);

    if (!updateBlog.affected) throw new NotFoundException(BLOG.NOT_FOUND);
  }
}
