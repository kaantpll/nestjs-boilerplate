import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ProfileService } from 'src/profile/services/profile.service';
import { USER_REPOSITORY } from 'src/shared/constants/constants';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { CreateUserType } from 'src/shared/types/user';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: Repository<User>,
    private profileService: ProfileService,
  ) {}

  async getList() {
    return await this.userRepository.find({
      relations: { profile: true, blogs: true },
    });
  }
  async create(data: CreateUserType) {
    const {username,password,gender,photo,email,role} = data
    const profile = await this.profileService.createANewProfile(data);
 
    let user = new User();

    const hashedPassword = await this.hashPassword(password)

    user = {
      ...user,
      username,
      password : hashedPassword,
      profile,
      gender,
      photo,
      email,
      role
    }

    await this.userRepository.insert(user);

    return user;
  }

  async hashPassword(password:string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    password = hash;

    return password;
  }

  async getOneByUsername(username: string) {
    const user = await this.userRepository.findOneBy({ username: username });
    if (!user) throw new NotFoundException('user not found!');
    return user;
  }

  async getById(id: number) {
    const user =  this.userRepository.findOneBy({ id });

    if(!user){
      throw new NotFoundException()
    }
  }

  async delete(id: number) {
    const deletedUser = await this.userRepository.delete(id);
    if (!deletedUser.affected) throw new NotFoundException('User not found!');
  }
}
