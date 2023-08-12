import { LoginPageSetting } from 'api/setting/models/loginPageSetting';

export interface SettingState {
  login: LoginPageSetting | null;
}
