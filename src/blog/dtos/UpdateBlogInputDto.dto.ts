import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength,MinLength } from 'class-validator';

export class UpdateBlogInputDto{
    @ApiProperty({example: 'sample title',})
    @MaxLength(50)
    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    title:string

    @ApiProperty({example: 'sample content',})
    @MaxLength(350)
    @MinLength(5)
    @IsNotEmpty()
    @IsString()
    content:string
    
}