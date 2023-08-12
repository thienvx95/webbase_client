//Rounting Path
export const RoutingPath = {
  Dashboard: '/dashboard',
  Login: '/login',
  Account: '/dashboard/account',
  UserProfile: '/dashboard/account/profile',
  UserSetting: '/dashboard/account/settings',
  NotFound: '/dashboard/*',
};

//Base Api
export const BaseAPI = `${process.env.REACT_APP_API_ENDPOINT}/api`;

export enum ErrorCode {
  UnknownError = '9999',
  TooManyRequest = '1009',
}

export const pageSizeOptions = [5, 10, 20, 50, 100];
