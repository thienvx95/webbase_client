import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  baseSetting: () => _t(translations.pages.userSetting.baseSetting),
  securitySetting: () => _t(translations.pages.userSetting.securitySetting),
  notificationSetting: () =>
    _t(translations.pages.userSetting.notificationSetting),
};
