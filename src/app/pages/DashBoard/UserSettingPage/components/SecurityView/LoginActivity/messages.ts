import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  title: () =>
    _t(translations.pages.userSetting.securitySetting.loginActivity.title),
  description: () =>
    _t(
      translations.pages.userSetting.securitySetting.loginActivity.description,
    ),
  currentLocation: () =>
    _t(
      translations.pages.userSetting.securitySetting.loginActivity
        .currentLocation,
    ),
  city: () =>
    _t(translations.pages.userSetting.securitySetting.loginActivity.city),
  continent: () =>
    _t(translations.pages.userSetting.securitySetting.loginActivity.continent),
  country: () =>
    _t(translations.pages.userSetting.securitySetting.loginActivity.country),
  countryCode: () =>
    _t(
      translations.pages.userSetting.securitySetting.loginActivity.countryCode,
    ),
  isp: () =>
    _t(translations.pages.userSetting.securitySetting.loginActivity.isp),
  org: () =>
    _t(translations.pages.userSetting.securitySetting.loginActivity.org),
  ip: () => _t(translations.pages.userSetting.securitySetting.loginActivity.ip),
  Region: () =>
    _t(translations.pages.userSetting.securitySetting.loginActivity.region),
};
