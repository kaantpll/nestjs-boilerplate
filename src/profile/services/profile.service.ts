import { Injectable, Inject } from '@nestjs/common';
import { PROFILE_REPOSITORY } from 'src/shared/constants/constants';
import { Repository } from 'typeorm';
import { ProfileInputType } from '../../shared/types/ProfileInputType';
import { Profile } from '../models/profile.entity';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(PROFILE_REPOSITORY)
    private profileRepository: Repository<Profile>,
  ) {}

  async createANewProfile(profileType: ProfileInputType) {
    const profile = this.profileRepository.create(profileType);
    return await this.profileRepository.save(profile);
  }

  getOneProfileWithId(id: number) {
    return this.profileRepository.findOneBy({ id });
  }
}
