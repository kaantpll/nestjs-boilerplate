import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProfileService } from 'src/profile/services/profile.service';
import { USER_REPOSITORY } from 'src/shared/constants/constants';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserType } from 'src/shared/types/user';

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
    (user.photo = userType.photo), (user.gender = userType.gender);
    user.role = userType.role;
    user.blogs = [];

    const createdUser = this.userRepository.create(user);

    return await this.userRepository.save(createdUser);
  }

  async findOne(username: string) {
    const user = await this.userRepository.findOneBy({ username: username });
    if (!user) throw new NotFoundException('user not found!');
    return user;
  }

  async getUserWithId(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  async deleteUserWithId(id: number) {
    const deletedUser = await this.userRepository.delete(id);
    if (!deletedUser) throw new NotFoundException('User not found!');
  }
}
