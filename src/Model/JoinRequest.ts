import { UserId } from './User';
import { Request } from 'express';

export type JoinRequest = UserId & {
  userName: string;
};

/**
 * 入室リクエストのバリデーション
 * @param req
 */
export const validJoinRequest = (req: Request) => {
  const roomName = (req.params as { roomName: string }).roomName;
  const payl = req.body as JoinRequest;

  return !!(
    roomName &&
    roomName.length > 0 &&
    payl &&
    payl.userId &&
    payl.userName &&
    payl.userId.length > 0 &&
    payl.userName.length > 0
  );
};
