import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/services/user.service';
import * as bcrypt from 'bcrypt';
import {
  CreateUserType,
  JwtTokenType,
  LoginUserType,
} from 'src/shared/types/user';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string) {
    const user = await this.usersService.getOneByUsername(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(data: LoginUserType) {
    const { username, password } = data;

    const foundedUser = await this.usersService.getOneByUsername(username);
    const isMatch = await bcrypt.compare(password, foundedUser.password);

    if (!isMatch) throw new BadRequestException('Password isnt correct!');

    const payload = {
      username,
      id: foundedUser.id,
      role: foundedUser.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(data: CreateUserType) {
    const newUser = await this.usersService.create(data);

    const payload = {
      username: newUser.username,
      id: newUser.id,
      role: newUser.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  decodejwt(accessToken: string) {
    const decoded = this.jwtService.decode(accessToken) as JwtTokenType;

    return decoded.id;
  }
}
