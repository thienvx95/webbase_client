import decode, { JwtPayload } from 'jwt-decode';
import { CacheKey, LocalStorageUtil } from './localStorageUtil';
import { isEmpty } from 'lodash';
import { UserProfile } from 'api/user/models';

interface ITokenUtil {
  isAuthenticated: () => boolean;
  getCurentUserProfile: () => UserProfile | null;
}

export const TokenUtil: ITokenUtil = {
  isAuthenticated: (): boolean => {
    const token = LocalStorageUtil.get<string>(CacheKey.WebApiToken);
    const refreshToken = LocalStorageUtil.get<string>(
      CacheKey.WebApiRefreshhToken,
    );
    if (isEmpty(token) || isEmpty(refreshToken)) return false;

    try {
      const { exp } = decode(token) as JwtPayload;
      if (exp != null && Date.now() / 1000 > exp) {
        return false;
      }
    } catch (err) {
      return false;
    }
    return true;
  },
  getCurentUserProfile: (): UserProfile | null => {
    const token = LocalStorageUtil.get<string>(CacheKey.WebApiToken);
    if (isEmpty(token)) return null;
    try {
      return decode(token) as UserProfile;
    } catch (err) {
      return null;
    }
  },
};
