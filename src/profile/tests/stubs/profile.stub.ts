import { Profile } from 'src/profile/profile.entity';

export const profileStub = (): Profile => {
  return {
    id: 1,
    gender: 'male',
    photo: '/path',
  };
};

export const profileInvalid = (): Profile => {
  return {
    id: -1,
    gender: null,
    photo: null,
  };
};
