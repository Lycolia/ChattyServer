import express from 'express';
import { MessageHistories } from 'src/Controller/MessageHistories';
import { antiSpy } from 'src/Middleware/Auth';

export const route = express.Router();

route.get('/room/list');

route.post('/room/join/:roomName');
route.delete('/room/join/:roomName');

route.get('/room/message/:roomName', antiSpy, MessageHistories);
route.post('/room/message/:roomName');
