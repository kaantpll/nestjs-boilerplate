import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { DatabaseModule } from 'src/db/database.module';
import { ProfileModule } from 'src/profile/modules/profile.module';
import { UserController } from '../controllers/user.controller';
import { UserResolver } from '../graphql/resolvers/userResolver';
import { userProviders } from '../services/user.provider';
import { UserService } from '../services/user.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    DatabaseModule,
    ProfileModule,
  ],

  providers: [...userProviders, UserService, UserResolver],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
