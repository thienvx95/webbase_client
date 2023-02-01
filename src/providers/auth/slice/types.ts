import { ErrorResult } from 'api/common/models';

/* --- STATE --- */
export interface AuthenticateState {
  error: ErrorResult | null;
  token: string | null;
  refreshToken: string | null;
}

export type ContainerState = AuthenticateState;
