import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/db/database.module";
import { UserModule } from "src/user/modules/user.module";
import { BlogController } from "../controllers/blog.controller";
import { blogProviders } from "../services/blog.provider";
import { BlogService } from "../services/blog.service";


@Module({
    imports:[DatabaseModule,UserModule],
    providers:[...blogProviders,BlogService],
    controllers:[BlogController]
})

export class BlogModule{}