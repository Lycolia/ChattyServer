import { Rooms } from '@prisma/client';
import { prisma } from '../server';
import { createUser } from './User';

export const joinRoom = async (
  roomName: string,
  userName: string,
  userId: string
) => {
  const room = await createRoom(roomName);
  const user = await createUser(userName, userId, room);
  return {
    room,
    user,
  };
};

/**
 * DBに部屋があれば取得する
 * @param roomName
 * @returns 部屋 | null
 * @throws DBエラー
 */
export const getExistsRoom = async (roomName: string) => {
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
  // 存在する部屋を取得
  const room = await getExistsRoom(roomName);
  if (!room) {
    // 部屋がなければ作る
    return await prisma.rooms.create({
      data: {
        name: roomName,
      },
    });
  }

  return room;
};
