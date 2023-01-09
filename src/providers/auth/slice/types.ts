import { ErrorResult } from 'api/common/models';
import { UserProfile } from 'api/user/models';

/* --- STATE --- */
export interface AuthenticateState {
  error: ErrorResult | null;
  token: string | null;
  refreshToken: string | null;
  user: UserProfile | null;
}

export type ContainerState = AuthenticateState;
