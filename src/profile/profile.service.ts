import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Profile } from './profile.entity';
import { ProfileInputType } from '../shared/types/user';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private profileRepository: Repository<Profile>,
  ) {}

  async getList() {
    return await this.profileRepository.find();
  }

  async getOne(id: number) {
    const profile = await this.profileRepository.findOneBy({ id });

    if (!profile) {
      throw new NotFoundException(PROFILE.NOT_FOUND);
    }

    return profile;
  }

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

  async update(id: number, data: UpdateProfileType) {
    const updated = await this.profileRepository.update(id, data);

    if (!updated.affected) {
      throw new NotFoundException(PROFILE.NOT_FOUND);
    }

    return true;
  }

  async delete(id: number) {
    const deleted = await this.profileRepository.delete(id);

    if (!deleted.affected) {
      throw new NotFoundException(PROFILE.NOT_FOUND);
    }

    return true;
  }
}

export type UpdateProfileType = {
  photo: string;
  gender: string;
};
