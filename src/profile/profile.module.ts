import { Module } from "@nestjs/common";
import { DatabaseModule } from "src/db/database.module";
import { ProfileController } from "./profile.controller";
import { profileProviders } from "./services/profile.provider";
import { ProfileService } from "./services/profile.service";


@Module({
    
    imports:[DatabaseModule],
    providers:[
        ...profileProviders,
        ProfileService
    ],
    controllers:[ProfileController],
    exports:[ProfileService]
})

export class ProfileModule{}