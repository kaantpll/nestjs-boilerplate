import { Role } from 'src/user/entities/role.enum';

export type CreateUserType = {
  username: string;
  password: string;
  email: string;
  gender: string;
  photo: string;
  role: Role;
};

export type RegisterUserType = {
  username: string;
  password: string;
  email: string;
  gender: string;
  photo: string;
};

export type ProfileInputType = {
  gender: string;
  photo: string;
};

export type LoginUserType = {
  username: string;
  password: string;
};

export type JwtTokenType = {
  id: number;

};
