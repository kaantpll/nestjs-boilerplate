import { PROFILE_REPOSITORY } from 'src/shared/constants/constants';
import { DataSource } from 'typeorm';
import { Profile } from '../profile.entity';


export const profileProviders = [
  {
    provide: PROFILE_REPOSITORY,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Profile),
    inject: ['DATA_SOURCE'],
  },
];