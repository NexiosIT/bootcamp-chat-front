import { IChatmessage } from "./ChatMessage";
import { IChatroom } from "./ChatRoom";
import { IUser } from "./User";

export interface ApiResultBase {
  isSuccess: boolean;
  error?: string;
}

// Authentication api
export interface LoginResult extends ApiResultBase {
  accessToken?: string;
}

export interface RegisterResult extends ApiResultBase {}

// User api
export interface GetUserResult extends ApiResultBase {
  user?: IUser;
}

export interface GetUsersResult extends ApiResultBase {
  users?: IUser[];
}

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

export interface CreateMessageRequest {
  user: string;
  chatroom: string;
  data: string;
}

export interface CreateMessageResult extends ApiResultBase {
  message?: IChatmessage;
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