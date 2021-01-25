import request from 'supertest';
import { server } from '../src/server';

describe('server test', () => {
  it('common test', async () => {
    const res = await request(server).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual({ test: 123 });
  });
});
