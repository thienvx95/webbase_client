import { UserDetail } from 'api/user/models';
import { UserInformation } from 'api/user/models/userInformation';

/* --- STATE --- */
export interface UserSettingState {
  user: UserDetail | null;
  userInformation: UserInformation | null;
}

export type ContainerState = UserSettingState;
