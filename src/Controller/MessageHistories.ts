import { Request, Response } from 'express';
import { ChatHistoryRequest } from '../Model/Request/ChatHistoryRequest';

export const MessageHistories = (req: Request, res: Response) => {
  const body = req.body as ChatHistoryRequest;

  res;
};
