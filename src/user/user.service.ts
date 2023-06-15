import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserType } from 'src/shared/types/user';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private profileService: ProfileService,
  ) {}

  async getList() {
    return await this.userRepository.find({
      relations: { profile: true, blogs: true },
    });
  }
  async create(data: CreateUserType) {
    const { username, password, gender, photo, email, role } = data;
    const profile = await this.profileService.create(data);

    let user = new User();

    const hashedPassword = await this.hashPassword(password);

    user = {
      ...user,
      username,
      password: hashedPassword,
      profile,
      gender,
      photo,
      email,
      role,
    };

    await this.userRepository.insert(user);

    return user;
  }

  async hashPassword(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    password = hash;

    return password;
  }

  async getOneByUsername(username: string) {
    const user = await this.userRepository.findOneBy({ username });

    if (!user) throw new NotFoundException(USER.NOT_FOUND);

    return user;
  }

  async getById(id: number) {
    const user = this.userRepository.findOneBy({ id });

    if (!user) throw new NotFoundException(USER.NOT_FOUND);

    return user;
  }

  async delete(id: number) {
    const deletedUser = await this.userRepository.delete(id);

    if (!deletedUser.affected) throw new NotFoundException(USER.NOT_FOUND);
  }
}
