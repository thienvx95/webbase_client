import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  systemTheme: () => _t(translations.theme.system),
  dark: () => _t(translations.theme.dark),
  light: () => _t(translations.theme.light),
};
