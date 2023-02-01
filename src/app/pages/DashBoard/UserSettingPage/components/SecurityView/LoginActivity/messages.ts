import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  title: () =>
    _t(translations.pages.userSetting.securitySetting.loginActivity.title),
  description: () =>
    _t(
      translations.pages.userSetting.securitySetting.loginActivity.description,
    ),
};
