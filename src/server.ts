import express from 'express';
import io, { Socket } from 'socket.io';
import { GeneralErrorHandler } from './Middleware/GeneralErrorHandler';
import { route } from './router';
export const app = express();

app.use('/', route);
app.use(GeneralErrorHandler);

export const server = app.listen(9999, () => {
  console.log('Example app listening at http://localhost:9999');
});

if (process.env.NODE_ENV === 'test') {
  // テスト時はサーバーを即落とす
  server.close();
}
