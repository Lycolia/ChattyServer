import { Request } from 'express';

/**
 * 部屋名とペイロード
 */
export type RoomPayload<Payload> = {
  name: string;
  payload: Payload;
};

/**
 * 部屋名とリクエストBodyの取得
 * @typeparam Payload リクエストBody
 * @param req Request
 *
 * @returns 部屋名＋リクエストBody | null
 */
export const getRoomPayload = <Payload>(
  req: Request
): RoomPayload<Payload> | null => {
  const roomName = (req.params as { roomName: string | undefined }).roomName;
  if (roomName) {
    return {
      name: roomName,
      payload: req.body as Payload,
    };
  } else {
    return null;
  }
};
