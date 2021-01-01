import { UserId } from './UserId';

export type SendMessage = UserId & {
  message: string;
  userId: string;
};
