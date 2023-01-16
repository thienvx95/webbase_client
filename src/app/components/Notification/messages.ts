import { translations } from 'locales/translations';
import { _t } from 'utils/messages';

export const messages = {
  success: (state: string) => _t(translations.notification.success[state]),
  error: (state: string) => _t(translations.notification.errors[state]),
  warning: (state: string) => _t(translations.notification.warning[state]),
};
