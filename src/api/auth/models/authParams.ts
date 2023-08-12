export interface AuthParams {
  username?: string;
  password?: string;
  autoLogin?: boolean;
  type?: string;
}

export interface GoogleAuthParams {
  code: string;
  remmember: boolean;
}

export interface RefreshTokenParam {
  token: string;
}
