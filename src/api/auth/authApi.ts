import { ResponseResult } from 'api/common/models';
import { axiosClinet } from '../axiosClient';
import { AuthParams, AuthResult } from './models';

const AuthAPIPath = {
  Login: `/auth/`,
  LoginWithGoogle: `/auth/google`,
  RefreshToken: `/auth/refreshToken`,
};

export const AuthAPI = {
  async login(data: AuthParams): Promise<ResponseResult<AuthResult>> {
    return await axiosClinet.post(AuthAPIPath.Login, data);
  },
  async loginWithGoogle(
    data: GoogleAuthParams,
  ): Promise<ResponseResult<AuthResult>> {
    return await axiosClinet.post(AuthAPIPath.LoginWithGoogle, data);
  },
  async refreshToken(token: string): Promise<ResponseResult<AuthResult>> {
    return await axiosClinet.post(AuthAPIPath.RefreshToken, token);
  },
};
