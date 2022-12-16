import { Controller,Get,Body,Param,Post,HttpCode,ParseIntPipe, Put, Delete, UseInterceptors } from "@nestjs/common";
import { LoggingInterceptor } from "src/shared/logInterceptor";
import { CreateBlogInputDto } from "../dtos/CreateBlogInputDto.dto";
import { UpdateBlogInputDto } from "../dtos/UpdateBlogInputDto.dto";
import { BlogService } from "../services/blog.service";

@Controller('api/v1/blogs')
export class BlogController{
    
    constructor(private blogService : BlogService){}


    @Get()
    @HttpCode(200)
    @UseInterceptors(new LoggingInterceptor())
    getBlogs(){
        return this.blogService.getBlogList();
    }

    @Post()
    @HttpCode(201)
    createNewBlog(@Body() blogDto:CreateBlogInputDto)
    {
        this.blogService.createNewABlog(blogDto)
    }

    @Get(':id')
    @HttpCode(200)
    getBlogById(@Param('id',ParseIntPipe) id :number){
       return this.blogService.getBlogWithId(id)
    }

    @Put(':id')
    @HttpCode(200)
    updateBlogWithId(@Param('id',ParseIntPipe) id:number,@Body() updateBlogDto:UpdateBlogInputDto){
        return this.blogService.updateBlog(id,updateBlogDto)
    }

    @Delete('id')
    @HttpCode(200)
    deleteBlogById(@Param('id',ParseIntPipe) id:number){
        this.blogService.deleteById(id)
    }
}