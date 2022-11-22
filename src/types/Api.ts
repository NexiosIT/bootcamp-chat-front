import { IChatroom } from "./ChatRoom";

export interface ApiResultBase {
  isSuccess: boolean;
  error?: string;
}

export interface LoginResult extends ApiResultBase {
  accessToken?: string;
}

export interface RegisterResult extends ApiResultBase {}

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

// api response types
export interface IApiChatMessage {
  id: string;
  user: string;
  chatroom: IApiChatroom;
  data: string;
  published_at: string;
}

export interface IApiChatroom {
  id: string;
  name: string;
  allowed_users: string[];
}

export interface IApiUser {
  id: string;
  email: string;
  username: string;
  initials: string;
}