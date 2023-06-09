import { Controller ,Get,Body,Post, HttpCode, Delete, Param, ParseIntPipe} from "@nestjs/common";
import { CreateUserDto } from "./dto/create";

import { UserService } from "./services/user.service";


@Controller('api/v1/users')
export class UserController{
    constructor(private userService:UserService){}

   @Get()
   @HttpCode(200)
   async getList(){
        return await this.userService.getList();
    }

    @Get(':id')
    @HttpCode(200)
    async getOne(@Param('id', ParseIntPipe) id: number){
        return await this.userService.getById(id);
    }
    
    @Post()
    @HttpCode(201)
    async create(@Body() userDto:CreateUserDto){
        return await this.userService.create(userDto)
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id', ParseIntPipe) id: number){
        await this.userService.delete(id)
    }

}