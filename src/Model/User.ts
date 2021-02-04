import { Rooms, Users } from '@prisma/client';
import { prisma } from '../server';

export type UserId = {
  userId: string;
};
/**
 * DBにユーザーがあれば取得する
 * @param userId
 * @returns ユーザー | null
 * @throws DBエラー
 */
export const getExistsUser = async (userId: string) => {
  if (userId) {
    // ユーザーIDがある場合
    const user = await prisma.users.findFirst({ where: { id: userId } });
    return user;
  } else {
    return null;
  }
};

/**
 * 新しいユーザーの作成
 * @param userName ユーザー名
 * @param room 部屋
 */
export const createNewUser = async (userName: string, room: Rooms) => {
  return await prisma.users.create({
    data: {
      name: userName,
      Room: {
        connect: {
          name: room.name,
        },
      },
      active: true,
    },
  });
};

/**
 * ユーザー作成
 * @param userName ユーザー名
 * @param userId ユーザーID
 * @param room 部屋
 * @returns ユーザー
 * @throws DBエラー
 */
export const createUser = async (
  userName: string,
  userId: string,
  room: Rooms
): Promise<Users> => {
  // 存在するユーザーを取得
  const user = await getExistsUser(userId);
  if (user) {
    // ユーザーがDBにあれば、そのユーザーを返す
    return user;
  } else {
    // ユーザーがないので新規作成する
    return await createNewUser(userName, room);
  }
};
