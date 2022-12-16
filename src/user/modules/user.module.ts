import {Module} from '@nestjs/common'
import { DatabaseModule } from 'src/db/database.module';
import { ProfileModule } from 'src/profile/modules/profile.module';
import { profileProviders } from 'src/profile/services/profile.provider';
import { ProfileService } from 'src/profile/services/profile.service';
import { UserController } from '../controllers/user.controller';
import { userProviders } from '../services/user.provider';
import { UserService } from '../services/user.service';

@Module({

    imports:[DatabaseModule,ProfileModule],
    providers:[
        ...userProviders,
        UserService,
    ],
    controllers:[UserController],
    exports:[UserService]
})

export class UserModule{}