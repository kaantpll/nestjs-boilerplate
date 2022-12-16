import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator"

export class CreateProfileInputDto{
    @ApiProperty({example: 'sample gender'})
    @MaxLength(50)
    @MinLength(3)
    @IsNotEmpty()
    @IsString()
    gender:string

    @ApiProperty({example: 'sample png'})
    @IsString()
    photo:string
}