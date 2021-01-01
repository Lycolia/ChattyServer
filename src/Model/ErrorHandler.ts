import { NextFunction, Request, Response } from 'express';

export const asyncErr = (cb: (req: Request, res: Response, next: NextFunction) => {}) => {
  return cb(req, res).;
};
