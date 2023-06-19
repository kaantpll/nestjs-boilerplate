import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BlogType } from '../types/blog-type';
import { UserType } from '../types/user-type';
import { UserService } from 'src/user/user.service';

@Resolver((of: any) => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [UserType])
  async getAllList() {
    return this.userService.getList();
  }

  @Query(() => UserType)
  findByUser(@Args('username') username: string) {
    return this.userService.getOneByUsername(username);
  }
}
