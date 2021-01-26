import { Request } from 'express';

/**
 * 部屋名とリクエストペイロード
 */
export type RoomPayload<ReqestPayload> = {
  name: string;
  payload: ReqestPayload;
};

/**
 * 部屋名とリクエストBodyの取得
 * @typeparam Payload リクエストペイロード
 * @param req Request
 *
 * @returns 部屋名とリクエストペイロード
 */
export const getRoomPayload = <RequestPayload>(
  req: Request
): RoomPayload<RequestPayload> => {
  const roomName = (req.params as { roomName: string }).roomName;

  return {
    name: roomName,
    payload: req.body as RequestPayload,
  };
};
