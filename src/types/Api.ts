export interface ApiResultBase {
  isSuccess: boolean;
  error?: string;
}

export interface LoginResult extends ApiResultBase {
  // TODO: add any response data from login
}