import type { SexType } from '@faker-js/faker';

export type User = {
    _id: string;
    avatar: string;
    followers: number;
    following: number;
    firstName: string;
    lastName: string;
    sex: SexType;
    desc: string;
    color: string;
  }