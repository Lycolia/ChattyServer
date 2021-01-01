import { PrismaClient } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { UserId } from '../Model/User';
import { GeneralError } from '../Model/GeneralError';

export type RequestOfRoom<Payload> = {
  name: string | undefined;
  payload: Payload;
};

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
 * 部屋名とリクエストBodyの取得
 * @typeparam Payload リクエストBody
 * @param req Request
 *
 * @returns 部屋名＋リクエストBody
 */
export const getRoomProps = <Payload>(req: Request): RequestOfRoom<Payload> => {
  return {
    name: (req.params as { roomName: string | undefined }).roomName,
    payload: req.body as Payload,
  };
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
