import { mockReq } from 'sinon-express-mock';
import { validJoinRequest } from '../../src/Model/JoinRequest';

const validReq = mockReq({
  params: {
    roomName: 'test-room',
  },
  body: {
    userId: 'abcd',
    userName: 'test-user',
  },
});

const invalidReqs = [
  mockReq({
    params: {},
    body: {},
  }),
  mockReq({
    params: {
      roomName: undefined,
    },
    body: {
      userId: undefined,
      userName: undefined,
    },
  }),
  mockReq({
    params: {
      roomName: null,
    },
    body: {
      userId: null,
      userName: null,
    },
  }),
  mockReq({
    params: {
      roomName: '',
    },
    body: {
      userId: '',
      userName: '',
    },
  }),
];

describe('validJoinRequest', () => {
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
