import { Request, Response } from 'express';
import { JoinRequest, validJoinRequest } from '../Model/JoinRequest';
import { joinRoom } from '../Model/Room';
import { getRoomPayload } from '../Model/RoomPayload';

/**
 * 入室用
 * @param req
 * @param res
 */
export const roomJoin = async (req: Request, res: Response) => {
  if (!validJoinRequest(req)) {
    // バリデーションエラー
    res.status(400).send();
  } else {
    // バリデーションOK
    const rp = getRoomPayload<JoinRequest>(req);
    const join = await joinRoom(
      rp.name,
      rp.payload.userName,
      rp.payload.userId
    );
    res.status(200).send(join);
  }
};
