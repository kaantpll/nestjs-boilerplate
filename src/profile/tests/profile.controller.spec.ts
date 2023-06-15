import { Test } from '@nestjs/testing';
import { ProfileController } from '../profile.controller';
import { ProfileService } from '../profile.service';
import { profileStub } from './stubs/profile.stub';
import { Profile } from '../profile.entity';

jest.mock('../profile.service');

describe('ProfileController', () => {
  let profileController: ProfileController;
  let profileService: ProfileService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [ProfileController],
      providers: [ProfileService],
    }).compile();

    profileController = moduleRef.get<ProfileController>(ProfileController);
    profileService = moduleRef.get<ProfileService>(ProfileService);

    jest.clearAllMocks();
  });

  describe('getUserById', () => {
    describe('when getProfile is called', () => {
      let profile: Profile;

      beforeEach(async () => {
        profile = await profileController.getById(profileStub().id);
      });

      test('then it should call profileService', () => {
        expect(profileService.getOne).toBeCalledWith(profileStub().id);
      });

      
    });
  });
});
