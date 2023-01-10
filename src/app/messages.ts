import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const commonMessages = {
  loginMenu: () => _t(translations.menus.login),
  dashboardMenu: () => _t(translations.menus.dashboard),
  userSettingMenu: () => _t(translations.menus.setting),
  userProfileMenu: () => _t(translations.menus.profile),
  logoutMenu: () => _t(translations.menus.logout),
  admin: () => _t(translations.menus.admin),
  accountmanagement: () => _t(translations.menus.accountmanagement),
  menus: () => _t(translations.menus.menus),
  users: () => _t(translations.menus.users),
  system: () => _t(translations.menus.system),
  configuration: () => _t(translations.menus.configuration),
  settings: () => _t(translations.menus.settings),
  roles: () => _t(translations.menus.roles),
};
