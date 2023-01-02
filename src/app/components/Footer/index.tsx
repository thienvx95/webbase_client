import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright={`${currentYear} ${t(messages.producedTitle())}`}
    />
  );
};

export default Footer;
