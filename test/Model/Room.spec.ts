import { createRoom, getExistsRoom } from '../../src/Model/Room';
import { createNewUser } from '../../src/Model/User';
import { prisma } from '../../src/server';

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

afterAll(async () => {
  await prisma.$disconnect();
});

// describe('joinRoom', () => {
//   it('パラメーターNG', () => {
//     invalidReqs.forEach((req) => {
//       const invalid = validJoinRequest(req);
//       expect(invalid).toBe(false);
//     });
//   });
//   it('パラメーターOK', () => {
//     const valid = validJoinRequest(validReq);

//     expect(valid).toBe(true);
//   });
// });

describe('getExistsRoom', () => {
  beforeAll(async () => {
    await initalizeDatabase();
  });
  afterAll(async () => {
    await cleanDatabase();
  });

  it('部屋がない', async () => {
    const room = await getExistsRoom('invalid-room');
    expect(room).toBeNull();
  });
  it('部屋がある', async () => {
    const room = await getExistsRoom(testRoom);

    expect(room).not.toBeNull();
    expect(room?.name).toBe(testRoom);
  });
});

// describe('createRoom', () => {

//   it('パラメーターNG', () => {
//     invalidReqs.forEach((req) => {
//       const invalid = validJoinRequest(req);
//       expect(invalid).toBe(false);
//     });
//   });
//   it('パラメーターOK', () => {
//     const valid = validJoinRequest(validReq);

//     expect(valid).toBe(true);
//   });
// });
