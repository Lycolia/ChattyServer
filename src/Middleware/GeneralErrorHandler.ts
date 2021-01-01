import { Request, Response, NextFunction, Errback } from 'express';

/**
 * 最上位のエラー処理
 */
export const GeneralErrorHandler = (
  _err: Errback,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction
) => {
  res.status(500).send({ message: '予期しないエラーが発生しました。' });
};
