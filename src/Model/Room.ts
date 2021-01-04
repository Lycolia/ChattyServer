import { PrismaClient, Rooms } from '@prisma/client';
import { getNowUtcIsoString } from './DateTime';
import { createUser } from './User';

export const joinRoom = async (
  roomName: string,
  userName: string,
  userId: string | null
) => {
  const room = await createRoom(roomName);
  const user = await createUser(userName, userId, room);
};

/**
 * DBに部屋があれば取得する
 * @param roomName
 * @returns 部屋 | null
 * @throws DBエラー
 */
export const getExistsRoom = async (roomName: string) => {
  const prisma = new PrismaClient();
  const room = await prisma.rooms.findUnique({ where: { name: roomName } });
  return room;
};

/**
 * 部屋作成
 * @param roomName 部屋名
 * @returns 部屋
 * @throws DBエラー
 */
export const createRoom = async (roomName: string): Promise<Rooms> => {
  const prisma = new PrismaClient();
  // 存在する部屋を取得
  const room = await getExistsRoom(roomName);
  if (!room) {
    // 部屋がなければ作る
    return await prisma.rooms.create({
      data: {
        name: roomName,
        createdAt: getNowUtcIsoString(),
      },
    });
  }

  return room;
};
