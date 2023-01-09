import { AuthenticateState } from 'providers/auth/slice/types';
import { AppLayoutState } from 'providers/layout/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  appLayout?: AppLayoutState;
  auth: AuthenticateState;
}
