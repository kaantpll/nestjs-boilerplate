import { Inject, Injectable } from '@nestjs/common';
import { ProfileService } from 'src/profile/services/profile.service';
import { USER_REPOSITORY } from 'src/shared/constants/constants';
import { Repository } from 'typeorm';
import { CreateUserType } from '../../shared/types/CreateUserType';
import { UserNotFound } from '../exceptions/userNotFound';
import { User } from '../models/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
    private profileService: ProfileService,
  ) {}

  async getUserList() {
    return await this.userRepository.find({
      relations: { profile: true, blogs: true },
    });
  }
  async createANewUser(userType: CreateUserType) {
    const profile = await this.profileService.createANewProfile(userType);

    const user = new User();
    user.username = userType.username;
    user.profile = profile;
    user.email = userType.email;
    user.password = userType.password;
    user.photo= userType.photo,
    user.gender = userType.gender
    user.blogs = [];

    const createdUser = this.userRepository.create(user);

    return await this.userRepository.save(createdUser);
  }

  async findOne(username:string){
    return await this.userRepository.findOneBy({username:username});
  }

  async getUserWithId(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async deleteUserWithId(id: number) {
    const deletedUser = await this.userRepository.delete(id);
    if (!deletedUser) throw new UserNotFound('User not found!');
  }
}
