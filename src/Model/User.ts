import { PrismaClient, Rooms } from '@prisma/client';
import { getNowUtcIsoString } from './DateTime';

export type UserId = {
  userId: string | null;
};

/**
 * DBにユーザーがあれば取得する
 * @param userId
 * @returns ユーザー | null
 * @throws DBエラー
 */
export const getExistsUser = async (userId: string) => {
  const prisma = new PrismaClient();
  const user = await prisma.users.findFirst({ where: { id: userId } });
  return user;
};

/**
 * ユーザー作成
 * @param userName ユーザー名
 * @param room 部屋
 * @returns ユーザー
 * @throws DBエラー
 */
export const createUser = async (userName: string, room: Rooms) => {
  const prisma = new PrismaClient();
  const user = getExistsUser(userName);
  if (!user) {
    return await prisma.users.create({
      data: {
        name: userName,
        Room: {
          connect: room,
        },
        active: true,
        createdAt: getNowUtcIsoString(),
      },
    });
  }

  return user;
};
