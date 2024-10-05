import { faker } from '@faker-js/faker/.';
import { Platform } from 'react-native';
import { User } from '~/types';

const isAndroid = Platform.OS === 'android';

const createRandomUser = (): User => {
  const sex = faker.person.sexType();
  const firstName = faker.person.firstName(sex);
  const lastName = faker.person.lastName();
  return {
    _id: faker.string.uuid(),
    avatar: faker.image.avatar(),
    followers: faker.number.int({ min: 0, max: 5600 }),
    following: faker.number.int({ min: 0, max: 5600 }),
    firstName,
    lastName,
    sex,
    desc: faker.lorem.paragraph(3),
    color: faker.color.rgb(),
  };
};

export { isAndroid, createRandomUser };
