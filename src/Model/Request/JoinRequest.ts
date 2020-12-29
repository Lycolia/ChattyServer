import { UserId } from './UserId';

export type JoinRequest = UserId & {
  userName: string;
};
