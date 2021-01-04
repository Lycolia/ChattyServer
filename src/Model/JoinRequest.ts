import { UserId } from './User';

export type JoinRequest = UserId & {
  roomName: string;
  userName: string;
};
