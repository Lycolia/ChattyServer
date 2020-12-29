import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { GeneralError } from 'src/Model/Response/GeneralError';
import { UserId } from 'src/Model/Request/UserId';
import { getRoomProps } from 'src/Model/Room';

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
 * 盗聴防止
 */
export const antiSpy = (req: Request, res: Response, next: NextFunction) => {
  const room = getRoomProps<UserId>(req);
  const roomName = room.name;
  const userId = room.payload.userId;

  if (!userId || !roomName) {
    responseInvalid(res);
  } else {
    if (existUser(roomName, userId)) {
      next();
    } else {
      responseInvalid(res);
    }
  }
};

/**
 * ユーザーが部屋に存在するかどうか
 * @param roomName 部屋名
 * @param userId ユーザーID
 */
export const existUser = async (roomName: string, userId: string) => {
  const prisma = new PrismaClient();
  // 該当IDのユーザーレコードを全取得
  const user = await prisma.users.findMany({
    where: { id: userId },
  });
  // 入室チェック
  const room = user.find((item) => item.roomName === roomName);
  return !!room;
};
