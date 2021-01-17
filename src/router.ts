import express from 'express';
import { messageHistories } from './Controller/MessageHistories';
import { roomList } from './Controller/RoomList';
import { antiSpy } from './Middleware/Auth';

export const route = express.Router();

// for debug
route.get('/', (req, res) => {
  console.log(req);
  res.send({ test: 123 });
});

// non auth
route.get('/room/list', roomList);

// auth required
route.post('/room/join/:roomName', antiSpy);
route.delete('/room/join/:roomName', antiSpy);

route.get('/room/message/:roomName', antiSpy, messageHistories);
route.post('/room/message/:roomName', antiSpy);
