import { Request, Response, NextFunction } from 'express';
import { UserId } from '../Model/User';
import { GeneralError } from '../Model/GeneralError';
import { getRoomPayload } from '../Model/RoomPayload';
import { prisma } from '../server';

/**
 * 不正レスポンス
 */
export const responseInvalid = (res: Response) => {
  const err: GeneralError = {
    message: '不正なリクエストです',
  };
  res.status(403).send(err);
};

/**
 * authリクエストのバリデーター
 * @param req
 */
export const validRequest = (req: Request) => {
  const roomName = (req.params as { roomName: string }).roomName;
  const payl = req.body as UserId;

  return (
    roomName &&
    roomName.length > 0 &&
    payl &&
    payl.userId &&
    payl.userId.length > 0
  );
};

/**
 * 盗聴防止
 */
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!validRequest(req)) {
      responseInvalid(res);
    } else {
      const room = getRoomPayload<UserId>(req);
      const roomName = room.name;
      const userId = room.payload.userId;
      const userExists = await existsUser(roomName, userId);
      if (userExists) {
        next();
      } else {
        responseInvalid(res);
      }
    }
  } catch (error) {
    next(error);
  }
};

/**
 * ユーザーが部屋に存在するかどうか
 * @param roomName 部屋名
 * @param userId ユーザーID
 */
export const existsUser = async (roomName: string, userId: string) => {
  // 該当IDのユーザーレコードを取得（ユーザーレコードはidと部屋名の数だけある）
  const user = await prisma.users.findMany({
    where: { id: userId },
  });
  if (user.length === 0) {
    return false;
  }
  // 入室チェック（該当IDのユーザーレコードの中に部屋名を持つものがあるか）
  const room = user.find((item) => item.roomName === roomName);
  return !!room;
};
