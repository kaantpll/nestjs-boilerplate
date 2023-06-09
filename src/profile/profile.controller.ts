import { Controller,Post,Body,Get,Param, UseGuards } from "@nestjs/common";
import { ParseIntPipe } from "@nestjs/common/pipes";
import { LocalAuthGuard } from "src/auth/guards/localAuth.guard";
import { CreateProfileInputDto } from "./dtos/create";
import { ProfileService } from "./services/profile.service";


@Controller('api/v1/profiles')
export class ProfileController{

    constructor(private profileService:ProfileService){}

  
    @Post()
    async createProfile(@Body() profileDto:CreateProfileInputDto){
        this.profileService.createANewProfile(profileDto)
    }
    @UseGuards(LocalAuthGuard)
    @Get(':id')
    getOneId(@Param('id',ParseIntPipe) id:number){
        this.profileService.getOneProfileWithId(id)
    }
}