import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { BLOG_REPOSITORY } from 'src/shared/constants/constants';
import { UserNotFound } from 'src/user/exceptions/userNotFound';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { CreateBlogType } from '../../shared/types/CreateBlogType';
import { UpdateBlogType } from '../../shared/types/UpdateBlogType';
import { BlogNotFound } from '../exceptions/blogNotFound';
import { Blog } from '../models/blog.entity';
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
  async getBlogList() {
    //this.redisClient.hSet('key1', 'deger', 'degervalue');
    if (!this.redisClient.isReady) {
      const b = await this.redisClient.LRANGE('news:5', 0, 2);
      const c = await this.redisClient.GET('blogs');
      return JSON.parse(c);
      //console.log(b);
      const a = await this.redisClient.HGETALL('news:99');
      //console.log(a.veri);
      // console.log(a);
    } else {
      return await this.blogRepository.find();
    }
  }

  async getBlogFromRedis() {
    return await this.redisClient.GET('blogs');
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
    if (!blog) throw new BlogNotFound('Blog is not exist!');
    return blog;
  }

  async deleteById(id: number) {
    await this.blogRepository.delete({ id });
  }

  async updateBlog(id: number, blogType: UpdateBlogType) {
    const updateBlog = await this.blogRepository.update(id, { ...blogType });
    if (!updateBlog) throw new BlogNotFound('Blog is not exist!');
    return updateBlog.raw;
  }
}
