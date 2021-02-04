import { mockReq } from 'sinon-express-mock';
import { existsUser } from '../../src/Middleware/Auth';
import { createRoom } from '../../src/Model/Room';
import { createNewUser } from '../../src/Model/User';
import { prisma } from '../../src/server';

const validReq = mockReq({
  params: {
    roomName: 'test-room',
  },
  body: {
    userId: 'abcd',
    userName: 'test-user',
  },
});

const testRoom = 'testRoom';
const testUser = 'testUser';
let testId = '';
const initalizeDatabase = async () => {
  const room = await createRoom(testRoom);
  const user = await createNewUser(testUser, room);
  testId = user.id;
  return user;
};
const cleanDatabase = async () => {
  await prisma.users.deleteMany();
  await prisma.rooms.deleteMany();
};

beforeAll(async () => {
  await initalizeDatabase();
});
afterAll(async () => {
  await cleanDatabase();
  await prisma.$disconnect();
});

describe('existsUser', () => {
  const invalidReqs = [
    // 全てDBにない
    mockReq({
      params: {
        roomName: 'hoge',
      },
      body: {
        userId: 'fuga',
        userName: 'piyo',
      },
    }),
    // 部屋だけDBにある
    mockReq({
      params: {
        roomName: testRoom,
      },
      body: {
        userId: 'fuga',
        userName: 'piyo',
      },
    }),
    // IdだけDBにある
    mockReq({
      params: {
        roomName: 'hoge',
      },
      body: {
        userId: testId,
        userName: 'piyo',
      },
    }),
    // ユーザー名だけDBにある
    mockReq({
      params: {
        roomName: 'hoge',
      },
      body: {
        userId: 'fuga',
        userName: 'test-user',
      },
    }),
  ];

  // it('パラメーターNG', async () => {
  //   const testings = invalidReqs.map(async (req) => {
  //     const invalid = await existsUser(req.params.roomName, req.body.userId);

  //     expect(invalid).toBe(false);
  //   });

  //   return Promise.all(testings);
  // });
  it('パラメーターOK', async () => {
    const valid = await existsUser(testRoom, testId);

    expect(valid).toBe(true);
  });
});
