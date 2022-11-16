export interface ApiResultBase {
  isSuccess: boolean;
  error?: string;
}

export interface LoginResult extends ApiResultBase {
  // TODO: add any response data from login
}

export interface RegisterResult extends ApiResultBase {}

// api response types
export interface IApiChatMessage {
  id: string;
  user: string;
  chatroom: IApiChatRoom;
  data: string;
  published_at: string;
}

export interface IApiChatRoom {
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