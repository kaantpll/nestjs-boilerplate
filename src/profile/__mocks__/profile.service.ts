import { NotFoundException } from '@nestjs/common';
import { profileStub } from '../tests/stubs/profile.stub';

export const ProfileService = jest.fn().mockReturnValue({
  getList: jest.fn().mockResolvedValue([profileStub()]),
  getOne: jest.fn().mockResolvedValue(profileStub()),
  create: jest.fn().mockResolvedValue(profileStub()),
  update: jest.fn().mockResolvedValue(true),
  delete: jest.fn().mockResolvedValue(true),
});
