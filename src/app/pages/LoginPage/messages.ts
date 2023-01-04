import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  loginSuccessfull: () => _t(translations.pages.login.success),
  loginTitle: () => _t(translations.pages.login.title),
  usernamePlaceHolder: () => _t(translations.pages.login.username.placeholder),
  usernameRequired: () => _t(translations.pages.login.username.required),
  passwordPlaceHolder: () => _t(translations.pages.login.password.placeholder),
  passwordRequired: () => _t(translations.pages.login.password.required),
  loginErrorMessage: () => _t(translations.pages.login.error),
  rememberMe: () => _t(translations.pages.login.rememberMe),
  forgotPassword: () => _t(translations.pages.login.forgotPassword),
  loginWith: () => _t(translations.pages.login.loginWith),
  login: () => _t(translations.pages.login.login),
};
