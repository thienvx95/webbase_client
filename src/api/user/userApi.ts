import { ResponseResult } from 'api/common/models';
import { httpClient } from 'api/httpClient';
import { UserProfile } from './models';
import { UserInformation } from './models/userInformation';

export const UserAPIPath = {
  getUserProfile: `/user/me`,
};

export const UserAPI = {
  async getUserProfile(): Promise<ResponseResult<UserProfile>> {
    return await httpClient.get(UserAPIPath.getUserProfile);
  },
  async getCurrentIpLookup(): Promise<ResponseResult<UserInformation>> {
    return await httpClient.get(
      `https://extreme-ip-lookup.com/json/?key=${process.env.REACT_APP_API_KEY_IP_LOOKUP}`,
    );
  },
};
