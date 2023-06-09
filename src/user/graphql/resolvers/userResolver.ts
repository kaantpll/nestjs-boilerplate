import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from 'src/user/services/user.service';
import { BlogType } from '../types/blog-type';
import { UserType } from '../types/user-type';

@Resolver((of: any) => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(returns => [UserType])
   async getAllList() {
    return  this.userService.getList();
  }

  @Query((returns)=>UserType)
  findByUser(
    @Args('username') username:string
  ){
    return this.userService.getOneByUsername(username)
  }
}
