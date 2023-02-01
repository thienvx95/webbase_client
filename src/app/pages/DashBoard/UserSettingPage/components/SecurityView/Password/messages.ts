import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  loginSecurity: () =>
    _t(translations.pages.userSetting.securitySetting.loginSecurity),
  title: () =>
    _t(translations.pages.userSetting.securitySetting.changePassword.title),
  description: () =>
    _t(
      translations.pages.userSetting.securitySetting.changePassword.description,
    ),
  strong: () =>
    _t(translations.pages.userSetting.securitySetting.changePassword.strong),
  medium: () =>
    _t(translations.pages.userSetting.securitySetting.changePassword.medium),
  weak: () =>
    _t(translations.pages.userSetting.securitySetting.changePassword.weak),
  veryWeak: () =>
    _t(translations.pages.userSetting.securitySetting.changePassword.veryWeak),
  passwordStrength: () =>
    _t(
      translations.pages.userSetting.securitySetting.changePassword
        .passwordStrength,
    ),
};
