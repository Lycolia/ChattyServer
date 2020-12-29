import { UserId } from 'src/Model/Request/UserId';

export type SendMessage = UserId & {
  message: string;
  userId: string;
};
