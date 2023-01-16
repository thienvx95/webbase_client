import { ResponseResult } from 'api/common/models';
import { httpClient } from 'api/httpClient';
import { UserDetail } from './models';
import { UserInformation } from './models/userInformation';

export const UserAPIPath = {
  getUserProfile: `/user/me`,
  updateUserProfile: `/user/changeProfile`,
  uploadAvatar: `/user/uploadAvatar`,
};

export const UserAPI = {
  async getUserProfile(): Promise<ResponseResult<UserDetail>> {
    return await httpClient.get(UserAPIPath.getUserProfile);
  },
  async getCurrentIpLookup(): Promise<ResponseResult<UserInformation>> {
    return await httpClient.get(
      `https://extreme-ip-lookup.com/json/?key=${process.env.REACT_APP_API_KEY_IP_LOOKUP}`,
    );
  },
  async updateUserProfile(
    user: UserDetail,
  ): Promise<ResponseResult<UserDetail>> {
    return await httpClient.post(UserAPIPath.updateUserProfile, user);
  },
  async uploadAvatar(files: File[]): Promise<ResponseResult<boolean>> {
    return await httpClient.uploadFiles(
      UserAPIPath.updateUserProfile,
      files,
      'image',
    );
  },
};
