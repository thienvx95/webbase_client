import React from 'react';
import { Collapse, CollapseProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { EnvironmentOutlined } from '@ant-design/icons';
import { HeaderPanel } from 'app/components/Collapse/HeaderPanel';
import { LocalizationSetting } from './Localization';

export const PreferenceView: React.FC = () => {
  const { t } = useTranslation();
  const items: CollapseProps['items'] = [
    {
      label: (
        <HeaderPanel
          icon={<EnvironmentOutlined rev={null} />}
          title={t(messages.localization())}
        />
      ),
      key: 'loginActivity',
      children: <LocalizationSetting></LocalizationSetting>,
    },
  ];

  return <Collapse expandIconPosition="end" items={items}></Collapse>;
};
