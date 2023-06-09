import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { PROFILE_REPOSITORY } from 'src/shared/constants/constants';
import { Repository } from 'typeorm';
import { Profile } from '../profile.entity';
import { ProfileInputType } from 'src/shared/types/user';

@Injectable()
export class ProfileService {
  constructor(
    @Inject(PROFILE_REPOSITORY)
    private profileRepository: Repository<Profile>,
  ) {}

  async create(data: ProfileInputType) {
    const { gender, photo } = data;

    let profile = new Profile();

    profile = {
      ...profile,
      gender,
      photo,
    };

    await this.profileRepository.insert(profile);

    return profile;
  }

  async getOne(id: number) {
    const profile = await this.profileRepository.findOneBy({ id });

    if (!profile) {
      throw new NotFoundException(PROFILE.NOT_FOUND);
    }

    return profile;
  }
}
