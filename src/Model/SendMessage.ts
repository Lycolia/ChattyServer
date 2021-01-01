import { UserId } from './User';

export type SendMessage = UserId & {
  message: string;
  userId: string;
};
