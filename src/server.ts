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

// そのうち外出しする
const ws = new io.Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

ws.on('connection', (sock: Socket) => {
  sock.emit('hello', 'hello!');

  sock.on('test', (data: unknown) => {
    console.log(data);
  });
});
