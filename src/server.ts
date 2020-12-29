import express from 'express';
import io, { Socket } from 'socket.io';
import { route } from './router';
const app = express();

app.use(route);

app.get('/', (req, res) => {
  console.log(req);
  res.send('test!');
});

const server = app.listen(9999, () => {
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
