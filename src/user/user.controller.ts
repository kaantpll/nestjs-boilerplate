import { Controller ,Get,Body,Post} from "@nestjs/common";
import { CreateUserDto } from "./dto/create";

import { UserService } from "./services/user.service";


@Controller('api/v1/users')
export class UserController{

    constructor(private userService:UserService){}

   @Get()
   async getUsers(){
        return this.userService.getUserList();
    }

    @Post()
    async createUser(@Body() userDto:CreateUserDto){
        return this.userService.createANewUser(userDto)
    }

}