import { profileStub } from '../tests/stubs/profile.stub';

export const ProfileService = jest.fn().mockReturnValue({
  getOne: jest.fn().mockResolvedValue(profileStub()),
  create: jest.fn().mockResolvedValue(profileStub()),
});
