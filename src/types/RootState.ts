import { AuthenticateState } from 'app/pages/LoginPage/slice/types';
import { ThemeState } from 'styles/theme/slice/types';

/* 
  Because the redux-injectors injects your reducers asynchronously somewhere in your code
  You have to declare them here manually
*/
export interface RootState {
  theme?: ThemeState;
  authenticate: AuthenticateState;
}
