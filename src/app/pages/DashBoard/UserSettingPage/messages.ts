import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  personalInformation: () =>
    _t(translations.pages.userSetting.personalInformation),
  preferenceSetting: () =>
    _t(translations.pages.userSetting.preferenceSetting.title),
  securitySetting: () =>
    _t(translations.pages.userSetting.securitySetting.title),
  notificationSetting: () =>
    _t(translations.pages.userSetting.notificationSetting),
};
