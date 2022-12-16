import { Inject, Injectable } from '@nestjs/common';
import { BLOG_REPOSITORY } from 'src/shared/constants/constants';
import { UserService } from 'src/user/services/user.service';
import { Repository } from 'typeorm';
import { CreateBlogType } from '../../shared/types/CreateBlogType';
import { UpdateBlogType } from '../../shared/types/UpdateBlogType';
import { BlogNotFound } from '../exceptions/blogNotFound';
import { Blog } from '../models/blog.entity';

@Injectable()
export class BlogService {
  constructor(
    @Inject(BLOG_REPOSITORY) private blogRepository: Repository<Blog>,
    private userService: UserService,
  ) {}

  async getBlogList() {
    return await this.blogRepository.find();
  }
  async createNewABlog(blogType: CreateBlogType) {
    const user = await this.userService.getUserWithId(blogType.userId);

    const blog = new Blog();
      (blog.user = user),
      (blog.title = blogType.title),
      (blog.content = blogType.content);

    const createdBlog = this.blogRepository.create(blog);

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
