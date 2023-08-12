import { BaseSettingPage } from './baseSettingPage';

export interface LoginPageSetting extends BaseSettingPage {
  enableGoogleAuth: boolean;
  googleClientId: string;
  enableFacebookAuth: boolean;
  facebookeClientId: string;
  enableRembemerAuth: boolean;
  enableForgotPassword: boolean;
}
