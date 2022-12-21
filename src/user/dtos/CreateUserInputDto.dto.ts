import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Role } from '../models/role.enum';


export class CreateUserDto {
  @ApiProperty({ example: 'username' })
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 1234567 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'kaant@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  @MinLength(5)
  email: string;

  @ApiProperty({ example: 'male' })
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ example: 'picture.png' })
  @IsNotEmpty()
  photo: string;

  @ApiProperty({ example: 'user' })
  role: Role;
}
