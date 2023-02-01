import React from 'react';
import { Collapse } from 'antd';
import { useTranslation } from 'react-i18next';
import { ViewHeader } from '../component/viewHeader';
import { messages } from './messages';
import { EnvironmentOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

export const LoginActivityView: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Collapse expandIconPosition="right">
      <Panel
        header={
          <ViewHeader
            icon={<EnvironmentOutlined />}
            title={t(messages.title())}
            description={t(messages.description())}
          />
        }
        key="loginActivity"
      ></Panel>
    </Collapse>
  );
};

export default LoginActivityView;
