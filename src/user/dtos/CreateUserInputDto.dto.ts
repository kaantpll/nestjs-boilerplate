import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'sample username' })
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 1234567 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: "kaant@gmail.com"})
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
}
