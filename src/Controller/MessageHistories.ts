import { Request, Response } from 'express';
import { ChatHistoryRequest } from '../Model/ChatHistoryRequest';

export const messageHistories = (req: Request, res: Response) => {
  const body = req.body as ChatHistoryRequest;

  res;
};
