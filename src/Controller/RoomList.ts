import { NextFunction, Request, Response } from 'express';
import { getRoomList } from '../Model/RoomList';

export const roomList = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const roomList = await getRoomList();
    res.send(200).send(roomList);
  } catch (error) {
    next(error);
  }
};
