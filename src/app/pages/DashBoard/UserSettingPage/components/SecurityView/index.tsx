import React from 'react';
import { List } from 'antd';
import { ChangePasswordView } from './Password';
import { useTranslation } from 'react-i18next';
import { messages } from './Password/messages';
import LoginActivityView from './LoginActivity';
import { LogoutAllLocationButton } from './component/logoutAllLocationButton';

type Unpacked<T> = T extends (infer U)[] ? U : T;

export const SecurityView: React.FC = () => {
  const { t } = useTranslation();
  const getData = () => [
    {
      title: t(messages.loginSecurity()),
      description: <ChangePasswordView />,
    },
    {
      title: '',
      description: <LoginActivityView />,
    },
    {
      title: '',
      description: <LogoutAllLocationButton />,
    },
  ];

  const data = getData();
  return (
    <>
      <List<Unpacked<typeof data>>
        itemLayout="horizontal"
        dataSource={data}
        split={false}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta title={item.title} description={item.description} />
          </List.Item>
        )}
      />
    </>
  );
};
