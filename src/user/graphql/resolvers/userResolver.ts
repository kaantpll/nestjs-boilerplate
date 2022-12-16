import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from 'src/user/services/user.service';
import { BlogType } from '../types/BlogType';
import { UserType } from '../types/UserType';

@Resolver((of: any) => UserType)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(returns => [UserType])
   async getAllList() {
    return  this.userService.getUserList();
  }

  @Query((returns)=>UserType)
  findByUser(
    @Args('username') username:string
  ){
    return this.userService.findOne(username)
  }
}
