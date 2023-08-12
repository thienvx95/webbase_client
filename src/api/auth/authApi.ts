import { ResponseResult } from 'api/common/models';
import { httpClient } from 'api/httpClient';
import { AuthParams, AuthResult, GoogleAuthParams } from './models';

export const AuthAPIPath = {
  Login: `/auth/`,
  LoginWithGoogle: `/auth/google`,
  RefreshToken: `/auth/refreshToken`,
  GetGoogleClientId: `/auth/getGoogleClientId`,
};

export const AuthAPI = {
  async login(data: AuthParams): Promise<ResponseResult<AuthResult>> {
    return await httpClient.post(AuthAPIPath.Login, data);
  },
  async loginWithGoogle(
    data: GoogleAuthParams,
  ): Promise<ResponseResult<AuthResult>> {
    return await httpClient.post(AuthAPIPath.LoginWithGoogle, data);
  },
  async refreshToken(token: string): Promise<ResponseResult<AuthResult>> {
    return await httpClient.post(AuthAPIPath.RefreshToken, token);
  },
  async getGooogleClientId(): Promise<ResponseResult<string>> {
    return await httpClient.get(AuthAPIPath.GetGoogleClientId);
  },
};
