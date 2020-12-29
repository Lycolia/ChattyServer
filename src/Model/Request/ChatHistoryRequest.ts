import { UserId } from './UserId';

export type ChatHistoryRequest = UserId & {
  /** nullなら最新から取得 */
  startAt: number | null;
  /** 何件取ってくるか */
  range: number;
};
