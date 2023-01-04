/* --- STATE --- */
export interface AuthenticateState {
  authenticated: boolean;
  loading: false;
  status: string;
  token: string;
}

export type ContainerState = AuthenticateState;
