import { PrismaClient } from '@prisma/client';
import { mockReq } from 'sinon-express-mock';
import { existsUser } from '../../src/Middleware/Auth';
import { validJoinRequest } from '../../src/Model/JoinRequest';
import { createRoom } from '../../src/Model/Room';
import { createNewUser } from '../../src/Model/User';

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
  const prisma = new PrismaClient();
  await prisma.users.deleteMany();
  await prisma.rooms.deleteMany();
};

describe('validRequest', () => {
  const invalidReqs = [
    mockReq({
      params: {
        roomName: '',
      },
      body: {
        userId: '',
        userName: '',
      },
    }),
    mockReq({
      params: {
        roomName: 'abc',
      },
      body: {
        userId: '',
        userName: '',
      },
    }),
    mockReq({
      params: {
        roomName: '',
      },
      body: {
        userId: 'abc',
        userName: '',
      },
    }),
    mockReq({
      params: {
        roomName: '',
      },
      body: {
        userId: '',
        userName: 'abc',
      },
    }),
  ];

  it('パラメーターNG', () => {
    invalidReqs.forEach((req) => {
      const invalid = validJoinRequest(req);

      expect(invalid).toBe(false);
    });
  });
  it('パラメーターOK', () => {
    const valid = validJoinRequest(validReq);

    expect(valid).toBe(true);
  });
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

  beforeAll(async () => {
    return await initalizeDatabase();
  });
  afterAll(async () => {
    return await cleanDatabase();
  });
  it('パラメーターNG', async () => {
    const testings = invalidReqs.map(async (req) => {
      const invalid = await existsUser(req.params.roomName, req.body.userId);

      expect(invalid).toBe(false);
    });

    return Promise.all(testings);
  });
  it('パラメーターOK', async () => {
    const valid = await existsUser(testRoom, testId);

    expect(valid).toBe(true);
  });
});
