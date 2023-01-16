import { ErrorResult } from 'api/common/models';
import { UserDetail } from 'api/user/models';
import { UserInformation } from 'api/user/models/userInformation';

/* --- STATE --- */
export interface AuthenticateState {
  error: ErrorResult | null;
  token: string | null;
  refreshToken: string | null;
  user: UserDetail | null;
  userInformation: UserInformation | null;
}

export type ContainerState = AuthenticateState;
