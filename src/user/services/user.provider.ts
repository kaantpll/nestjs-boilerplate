import { USER_REPOSITORY } from "src/shared/constants/constants";
import { DataSource } from "typeorm";
import { User } from "../entities/user.entity";

export const userProviders = [
    {
      provide: USER_REPOSITORY,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
      inject: ['DATA_SOURCE'],
    },
  ];