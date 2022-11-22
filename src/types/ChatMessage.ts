import { IChatroom } from "./ChatRoom";

export interface IChatMessage {
  id: string;
  user: string;
  chatroom: IChatroom;
  data: string;
  publishedAt: Date;
}