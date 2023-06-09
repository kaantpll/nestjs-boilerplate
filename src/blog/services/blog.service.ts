import { CACHE_MANAGER, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BLOG_REPOSITORY } from 'src/shared/constants/constants';
import { UserNotFound } from 'src/user/exceptions/userNotFound';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { CreateBlogType } from '../../shared/types/create-blog-type';
import { UpdateBlogType } from '../../shared/types/UpdateBlogType';
import { Blog } from '../blog.entity';
import { RedisClientType } from 'redis';
import { RedisCache } from 'src/config/redis.interface';

@Injectable()
export class BlogService {
  private redisClient: RedisClientType;

  constructor(
    @Inject(BLOG_REPOSITORY) private blogRepository: Repository<Blog>,
    @Inject(CACHE_MANAGER) private cacheManager: RedisCache,
    private userService: UserService,
  ) {
    this.redisClient = this.cacheManager.store.getClient();
  }
  async getList() {
    return await this.blogRepository.find();
  }

  async createNewABlog(blogType: CreateBlogType) {
    const user = await this.userService.getUserWithId(blogType.userId);
    if (!user) throw new UserNotFound('user not found');

    const blog = new Blog();
    (blog.user = user),
      (blog.title = blogType.title),
      (blog.content = blogType.content);

    const createdBlog = this.blogRepository.create(blog);

    await this.redisClient.hSet('key1', 'deger1', 'deger2');
    await this.redisClient.hSet('key1', 'deger2', 'deger3');

    await this.blogRepository.save(createdBlog);
  }

  async getBlogWithId(id: number) {
    const blog = await this.blogRepository.findOneBy({ id });
    if (!blog) throw new NotFoundException('Blog is not exist!');
    return blog;
  }

  async deleteById(id: number) {
    await this.blogRepository.delete({ id });
  }

  async updateBlog(id: number, blogType: UpdateBlogType) {
    const updateBlog = await this.blogRepository.update(id, { ...blogType });
    if (!updateBlog) throw new NotFoundException('Blog is not exist!');
    return updateBlog.raw;
  }
}
