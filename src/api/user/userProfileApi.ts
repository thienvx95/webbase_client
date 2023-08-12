import { ResponseResult } from 'api/common/models';
import { PaginateParams } from 'api/common/models/paginateParams';
import { PaginateResult } from 'api/common/models/paginateResult';
import { httpClient } from 'api/httpClient';
import { ChangePasswordParams, UserDetail, UserLoginActivity } from './models';
import { UserInformation } from './models/userInformation';

export const UserProfileAPIPath = {
  getUserProfile: `/userProfile/me`,
  getCurrentUserLoginActivities: `/userProfile/currentUserLoginActivities`,
  updateUserProfile: `/userProfile/changeProfile`,
  uploadAvatar: `/userProfile/uploadAvatar`,
  changePassword: `/userProfile/changePassword`,
  deleteUserLogActivity: '/userProfile/userLoginActivity/',
  deleteAllUserLogActivity: '/userProfile/userLoginActivity',
  logOutAllLocations: '/userProfile/logoutAllLocations',
};

export const UserProfileAPI = {
  async getUserProfile(): Promise<ResponseResult<UserDetail>> {
    return await httpClient.get(UserProfileAPIPath.getUserProfile);
  },
  async getCurrentIpLookup(): Promise<ResponseResult<UserInformation>> {
    return await httpClient.get(
      `https://extreme-ip-lookup.com/json/?key=${process.env.REACT_APP_API_KEY_IP_LOOKUP}`,
    );
  },
  async getCurrentUserLoginActivities(
    request: PaginateParams,
  ): Promise<ResponseResult<PaginateResult<UserLoginActivity>>> {
    return await httpClient.post(
      UserProfileAPIPath.getCurrentUserLoginActivities,
      request,
    );
  },
  async deleteLogActivity(id: string): Promise<ResponseResult<boolean>> {
    return await httpClient.delete(
      `${UserProfileAPIPath.deleteUserLogActivity}${id}`,
    );
  },
  async deleteAllLogActivity(): Promise<ResponseResult<boolean>> {
    return await httpClient.delete(
      `${UserProfileAPIPath.deleteAllUserLogActivity}`,
    );
  },
  async updateUserProfile(
    user: UserDetail,
  ): Promise<ResponseResult<UserDetail>> {
    return await httpClient.post(UserProfileAPIPath.updateUserProfile, user);
  },
  async changePassword(
    data: ChangePasswordParams,
  ): Promise<ResponseResult<boolean>> {
    return await httpClient.post(UserProfileAPIPath.changePassword, data);
  },
  async uploadAvatar(files: File[]): Promise<ResponseResult<boolean>> {
    return await httpClient.uploadFiles(
      UserProfileAPIPath.uploadAvatar,
      files,
      'image',
    );
  },
  async logoutAllLocations(): Promise<ResponseResult<boolean>> {
    return await httpClient.post(UserProfileAPIPath.logOutAllLocations);
  },
};
