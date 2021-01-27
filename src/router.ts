import express from 'express';
import { messageHistories } from './Controller/MessageHistories';
import { roomList } from './Controller/RoomList';
import { auth } from './Middleware/Auth';

/**
 * Router
 */
export const route = express.Router();

// for debug
route.get('/', (req, res) => {
  console.log(req);
  res.send({ test: 123 });
});

// non auth
route.get('/room/list', roomList);

// auth required
route.post('/room/join/:roomName', auth);
route.delete('/room/join/:roomName', auth);

route.get('/room/message/:roomName', auth, messageHistories);
route.post('/room/message/:roomName', auth);
