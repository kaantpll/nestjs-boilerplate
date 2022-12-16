import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserType } from 'src/shared/types/CreateUserType';
import { LoginUserType } from 'src/shared/types/LoginUserType';
import { UserService } from 'src/user/services/user.service';
import { UserAlreadyExist } from '../exceptions/UserAlreadyExist';


@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService
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
    const payload = { username: user.username,};
    return {
      access_token:  this.jwtService.sign(payload),
    };
  }

  async register(registerUser : CreateUserType){
      const user = await this.usersService.findOne(registerUser.username)
      if(user) throw new UserAlreadyExist('User aldready exist!')
     
      const newUser=  await this.usersService.createANewUser(registerUser)
      
      const payload =  { username:newUser.username,id:newUser.id};
     
      return {
        access_token:  this.jwtService.sign(payload)
      }
  }

}