import { IChatmessage } from "./ChatMessage";
import { IChatroom } from "./ChatRoom";

export interface ApiResultBase {
  isSuccess: boolean;
  error?: string;
}

// Authentication api
export interface LoginResult extends ApiResultBase {
  accessToken?: string;
}

export interface RegisterResult extends ApiResultBase {}

// Chatroom api
export interface GetChatroomsResult extends ApiResultBase {
  chatrooms?: IChatroom[]
}

export interface CreateChatroomRequest {
  name: string;
  allowed_users: string[];
}

export interface CreateChatroomResult extends ApiResultBase {
  chatroom?: IChatroom;
}

// Chatmessage api
export interface GetMessagesResult extends ApiResultBase {
  messages?: IChatmessage[];
}

// api response types
export interface IApiChatmessage {
  _id: string;
  user: string;
  chatroom: IApiChatroom;
  data: string;
  published_at: string;
}

export interface IApiChatroom {
  _id: string;
  name: string;
  allowed_users: string[];
}

export interface IApiUser {
  _id: string;
  email: string;
  username: string;
  initials: string;
}