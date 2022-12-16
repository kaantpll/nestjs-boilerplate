import { BLOG_REPOSITORY } from "src/shared/constants/constants";
import { DataSource } from "typeorm";
import { Blog } from "../models/blog.entity";

export const blogProviders = [
    {
      provide: BLOG_REPOSITORY,
      useFactory: (dataSource: DataSource) => dataSource.getRepository(Blog),
      inject: ['DATA_SOURCE'],
    },
  ];