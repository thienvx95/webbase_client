import { PaginateResult } from 'api/common/models/paginateResult';
import { UserDetail, UserLoginActivity } from 'api/user/models';
import { UserInformation } from 'api/user/models/userInformation';

/* --- STATE --- */
export interface UserSettingState {
  user: UserDetail | null;
  userIpLookup: UserInformation | null;
  userLoginActivity: PaginateResult<UserLoginActivity> | null;
}

export type ContainerState = UserSettingState;
