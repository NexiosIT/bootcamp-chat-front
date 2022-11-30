import { IChatroom } from "./ChatRoom";

export interface IChatmessage {
  id: string;
  user: string;
  chatroom: IChatroom;
  data: string;
  publishedAt: Date;
}