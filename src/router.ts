import express from 'express';
import { MessageHistories } from './Controller/MessageHistories';
import { antiSpy } from './Middleware/Auth';

export const route = express.Router();

// for debug
route.get('/', (req, res) => {
  console.log(req);
  res.send('test!');
});

// non auth
route.get('/room/list');

// auth required
route.post('/room/join/:roomName', antiSpy);
route.delete('/room/join/:roomName', antiSpy);

route.get('/room/message/:roomName', antiSpy, MessageHistories);
route.post('/room/message/:roomName', antiSpy);
