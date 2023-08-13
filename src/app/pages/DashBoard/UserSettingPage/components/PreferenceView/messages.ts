import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  localization: () =>
    _t(translations.pages.userSetting.preferenceSetting.localization),
  language: () => _t(translations.pages.userSetting.preferenceSetting.language),
};
