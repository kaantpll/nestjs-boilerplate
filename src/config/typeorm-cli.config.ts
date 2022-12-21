import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { migr1671606198622 } from 'src/migrations/1671606198622-${MIGRATION_NAME}';



config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USERNAME'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  logging: configService.get<boolean>('DATABASE_LOGGING'),
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [migr1671606198622],
});
