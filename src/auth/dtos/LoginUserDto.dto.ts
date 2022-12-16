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

export class LoginUserDto {
  @ApiProperty({ example: 'sample username' })
  @MaxLength(50)
  @IsNotEmpty()
  @IsString()
  username: string;
  @ApiProperty({ example: 1234567 })
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
