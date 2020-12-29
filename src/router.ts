import express from 'express';
import { MessageHistories } from 'src/Controller/MessageHistories';
import { antiSpy } from 'src/Middleware/Auth';

export const route = express.Router();

// non auth
route.get('/room/list');

// auth required
route.post('/room/join/:roomName', antiSpy);
route.delete('/room/join/:roomName', antiSpy);

route.get('/room/message/:roomName', antiSpy, MessageHistories);
route.post('/room/message/:roomName', antiSpy);
