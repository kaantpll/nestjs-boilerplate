import { Test } from '@nestjs/testing';
import { ProfileController } from '../profile.controller';
import { profileInvalid, profileStub } from './stubs/profile.stub';
import { Profile } from '../profile.entity';
import { HttpException, NotFoundException } from '@nestjs/common';
import { exec } from 'child_process';
import { ProfileService } from '../profile.service';
import { CreateProfileInputDto } from '../dto/create';

jest.mock('../profile.service');

describe('ProfileController', () => {
  let profileController: ProfileController;
  let profileService: ProfileService;
  const PROFILE_ERROR = {
    NOT_FOUND: 'Profile not found!',
  };

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

  describe('When get by id', () => {
    describe('when get profile', () => {
      let profile: Profile;

      beforeEach(async () => {
        profile = await profileController.getById(profileStub().id);
      });

      test('then it should be called with id ', () => {
        expect(profileService.getOne).toBeCalledWith(profileStub().id);
      });

      test('then it equal with stub', () => {
        expect(profile).toEqual(profileStub());
      });

      test('then it call invalid data should throw exception', async () => {
        jest
          .spyOn(profileService, 'getOne')
          .mockRejectedValue(new NotFoundException(PROFILE_ERROR.NOT_FOUND));

        await expect(
          profileController.getById(profileInvalid().id),
        ).rejects.toThrow(new NotFoundException(PROFILE_ERROR.NOT_FOUND));
      });
    });
  });
  describe('When get list all ', () => {
    describe('when call get list', () => {
      let profileList: Profile[];

      beforeEach(async () => {
        profileList = await profileController.getList();
      });

      test('then it should called ', () => {
        expect(profileService.getList).toHaveBeenCalled();
      });

      test('then it should called should return profile list ', () => {
        expect(profileList).toEqual([profileStub()]);
      });
    });
  });

  describe('When create a new profile', () => {
    describe('when call create', () => {
      let profile: Profile;
      let createDto: CreateProfileInputDto;

      beforeEach(async () => {
        createDto = {
          gender: profileStub().gender,
          photo: profileStub().photo,
        };
        profile = await profileController.createProfile(createDto);
      });

      test('then it should called with params', () => {
        expect(profileService.create).toHaveBeenCalledWith({ ...createDto });
      });

      test('then it should return profile', () => {
        expect(profile).toEqual(profileStub());
      });
    });
  });

  describe('When update profile', () => {
    describe('when call update', () => {
      let value: boolean;
      let updatedDto: CreateProfileInputDto;

      beforeEach(async () => {
        updatedDto = {
          gender: profileStub().gender,
          photo: profileStub().photo,
        };

        value = await profileController.update(profileStub().id, updatedDto);
      });

      test('then it should called with params', () => {
        expect(profileService.update).toHaveBeenCalledWith(profileStub().id,{ ...updatedDto });
      });

      test('then it should return true', () => {
        expect(value).toBe(true);
      });

      test('then it called should return updated value', () => {
        expect(updatedDto).toEqual({
          gender: profileStub().gender,
          photo: profileStub().photo,
        });
      });
    });
  });

  describe('When delete profile', () => {
    describe('when call delete', () => {
      let value: boolean;

      beforeEach(async () => {
        value = await profileController.delete(profileStub().id);
      });

      test('then it  called with params', () => {
        expect(profileService.delete).toBeCalledWith(profileStub().id);
      });

      test('then it called should return true', () => {
        expect(value).toBe(true);
      });
    });
  });
});
