export interface AuthParams {
  username?: string;
  password?: string;
  autoLogin?: boolean;
  type?: string;
}

export interface GoogleAuthParams {
  code: string;
}

export interface RefreshTokenParam {
  token: string;
}
