import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const commonMessages = {
  loginMenu: () => _t(translations.menus.login),
  dashboardMenu: () => _t(translations.menus.dashboard),
  userSettingMenu: () => _t(translations.menus.setting),
  userProfileMenu: () => _t(translations.menus.profile),
  logoutMenu: () => _t(translations.menus.logout),
};
