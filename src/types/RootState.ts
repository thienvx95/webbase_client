import { AuthenticateState } from 'providers/auth/slice/types';
import { ThemeState } from 'providers/theme/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  theme?: ThemeState;
  authenticate: AuthenticateState;
}
