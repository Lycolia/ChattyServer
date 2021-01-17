import { Request, Response } from 'express';
import { JoinRequest } from '../Model/JoinRequest';
import { joinRoom } from '../Model/Room';
import { getRoomPayload } from '../Model/RoomPayload';

/**
 * 入室用
 * @param req
 * @param res
 */
export const roomJoin = async (req: Request, res: Response) => {
  const rp = getRoomPayload<JoinRequest>(req);
  if (!rp) {
    res.status(400).send();
  } else {
    await joinRoom(rp.name, rp.payload.userName, rp.payload.userId);
    res;
  }
};
