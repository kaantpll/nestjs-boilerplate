import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserType } from 'src/shared/types/create-user-type';
import { LoginUserType } from 'src/shared/types/login-user-type';
import { UserService } from 'src/user/services/user.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: LoginUserType) {
    const findUser = await this.usersService.findOne(user.username);
    const isMatch = await bcrypt.compare(user.password, findUser.password);

    if (!isMatch) throw new BadRequestException('Password isnt correct!');

    const payload = {
      username: findUser.username,
      id: findUser.id,
      role: findUser.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(registerUser: CreateUserType) {
    const newUser = await this.usersService.createANewUser(registerUser);

    const payload = {
      username: newUser.username,
      id: newUser.id,
      role: newUser.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
