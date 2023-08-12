export interface AuthResult {
  status?: string;
  type?: string;
  token?: string;
  refreshToken?: string;
  currentAuthority?: string;
  remmember?: boolean | undefined;
}
