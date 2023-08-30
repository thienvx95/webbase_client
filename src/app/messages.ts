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

export const formMessages = {
  title: (property: string) => _t(translations.form.title[property]),
  require: (property: string) => _t(translations.form.require[property]),
  invalid: (property: string) => _t(translations.form.invalid[property]),
};

export const buttonMessages = {
  submit: () => _t(translations.button.submit),
  cancel: () => _t(translations.button.cancel),
  ok: () => _t(translations.button.ok),
  upload: () => _t(translations.button.upload),
  saveChange: () => _t(translations.button.saveChange),
  delete: () => _t(translations.button.delete),
  deleteAll: () => _t(translations.button.deleteAll),
  edit: () => _t(translations.button.edit),
  new: () => _t(translations.button.new),
  logoutAllLocation: () => _t(translations.button.logoutAllLocation),
};

export const tableMessages = {
  userActivities: (property: string) =>
    _t(translations.table.userActivities[property]),
  userManagement: (property: string) =>
    _t(translations.table.userManagement[property]),
  action: () => _t(translations.table.action),
};

export const modalMessages = {
  deleteConfirm: (property: string) =>
    _t(translations.modal.deleteConfirm[property]),
  deleteAllConfirm: (property: string) =>
    _t(translations.modal.deleteAllConfirm[property]),
};
