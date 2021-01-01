import { PrismaClient } from '@prisma/client';

export type Room = {
  name: string;
  count: number;
};

/**
 * 部屋ごとの入出者数リスト
 * @param members 全部屋の入出者リスト
 * @returns 部屋ごとの入出者数リスト
 */
export const createMembersCount = (members: { roomName: string }[]) => {
  return members.reduce<{ [key: string]: number }>((acc, curr) => {
    acc[curr.roomName] = acc[curr.roomName] ? ++acc[curr.roomName] : 1;
    return acc;
  }, {});
};

/**
 * 部屋リスト
 */
export const getRoomList = async () => {
  const prisma = new PrismaClient();
  const members = await prisma.users.findMany({
    select: { roomName: true },
    where: { active: true },
  });

  return createMembersCount(members);
};
