import { Request, Response } from 'express';
import { JoinRequest } from '../Model/JoinRequest';
import { joinRoom } from '../Model/Room';
import { getRoomPayload } from '../Model/RoomPayload';

export const roomJoin = (req: Request, res: Response) => {
  const rp = getRoomPayload<JoinRequest>(req);
  if (!rp) {
    return;
  }
  joinRoom(rp.name, rp.payload.userName, rp.payload.userId);

  res;
};
