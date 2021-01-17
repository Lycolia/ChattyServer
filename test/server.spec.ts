import request from 'supertest';
import { server } from '../src/server';

describe('server test', () => {
  beforeAll(() => {
    // 非同期処理が終わらずにハングするのでサーバーを落としておく
    server.close();
  });

  it('common test', async () => {
    const res = await request(server).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({ test: 123 });
  });
});
