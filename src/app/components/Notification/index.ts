import { notification } from 'antd';
import i18next from 'i18next';
import { messages } from './messages';
import { stringFormat } from 'utils/functions';
export interface INotification {
  success: (key: string, value?: string[], isTranlation?: boolean) => void;
  warning: (key: string, value?: string[], isTranlation?: boolean) => void;
  error: (key: string, value?: string[], isTranlation?: boolean) => void;
}
export const Notification: INotification = {
  success: (key: string, values?: string[], isTranlation = true): void => {
    notification.success({
      message: getMessage(key, values, isTranlation),
    });
  },
  warning: (key: string, values?: string[], isTranlation = true): void => {
    notification.warning({
      message: getMessage(key, values, isTranlation),
    });
  },
  error: (key: string, values?: string[], isTranlation = true): void => {
    notification.error({
      message: getMessage(key, values, isTranlation),
    });
  },
};

const getMessage = (
  key: string,
  values?: string[],
  isTranlation = true,
): string => {
  let message = isTranlation ? i18next.t(messages.error(key)).toString() : key;
  if (values != null && values.length) {
    message = stringFormat(message, ...values);
  }
  return message;
};
