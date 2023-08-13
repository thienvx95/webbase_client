import * as React from 'react';
import { LanguageDropdown } from 'app/components/LanguageSwitch/LanguageDropdown';
import { Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { messages } from '../messages';

export const LocalizationSetting: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Form layout="vertical">
      <Form.Item label={t(messages.language()) ?? ''}>
        <LanguageDropdown></LanguageDropdown>
      </Form.Item>
    </Form>
  );
};
