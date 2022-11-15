import { IChatRoom } from "./ChatRoom";

export interface IChatMessage {
  id: string;
  user: string;
  chatroom: IChatRoom;
  data: string;
  publishedAt: Date;
}