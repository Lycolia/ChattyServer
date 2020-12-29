import { UserId } from 'src/Model/Request/UserId';

export type JoinRequest = UserId & {
  userName: string;
};
