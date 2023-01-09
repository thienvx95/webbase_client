import { notification } from 'antd';
import i18next from 'i18next';
import { messages } from './messages';

export interface INotification {
  success: (key: string, isTranlation?: boolean) => void;
  warning: (key: string, isTranlation?: boolean) => void;
  error: (key: string, isTranlation?: boolean) => void;
}
export const Notification: INotification = {
  success: (key: string, isTranlation = true): void => {
    notification.success({
      message: isTranlation ? i18next.t(messages[key]()).toString() : key,
    });
  },
  warning: (key: string, isTranlation = true): void => {
    notification.warning({
      message: isTranlation ? i18next.t(messages[key]()).toString() : key,
    });
  },
  error: (key: string, isTranlation = true): void => {
    notification.error({
      message: isTranlation ? i18next.t(messages[key]()).toString() : key,
    });
  },
};
