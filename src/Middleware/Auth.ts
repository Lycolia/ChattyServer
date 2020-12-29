import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { UserId } from '../Model/Request/UserId';
import { GeneralError } from '../Model/Response/GeneralError';
import { getRoomProps } from '../Model/Room';

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
export const antiSpy = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const room = getRoomProps<UserId>(req);
  const roomName = room.name;
  const userId = room.payload.userId;

  if (!userId || !roomName) {
    responseInvalid(res);
  } else {
    try {
      const userExists = await existsUser(roomName, userId);
      if (userExists) {
        next();
      } else {
        responseInvalid(res);
      }
    } catch (error) {
      next(error);
    }
  }
};

/**
 * ユーザーが部屋に存在するかどうか
 * @param roomName 部屋名
 * @param userId ユーザーID
 */
export const existsUser = async (roomName: string, userId: string) => {
  const prisma = new PrismaClient();
  // 該当IDのユーザーレコードを全取得
  const user = await prisma.users.findMany({
    where: { id: userId },
  });
  // 入室チェック
  const room = user.find((item) => item.roomName === roomName);
  return !!room;
};
