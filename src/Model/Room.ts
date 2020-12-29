import { Request } from 'express';

export type Room<Payload> = {
  name: string | undefined;
  payload: Payload;
};

/**
 * 部屋名とリクエストBodyの取得
 * @typeparam Payload リクエストBody
 * @param req Request
 *
 * @returns 部屋名＋リクエストBody
 */
export const getRoomProps = <Payload>(req: Request): Room<Payload> => {
  return {
    name: (req.params as { roomName: string | undefined }).roomName,
    payload: req.body as Payload,
  };
};
