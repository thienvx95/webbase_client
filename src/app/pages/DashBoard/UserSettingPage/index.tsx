import { GridContent, PageContainer } from '@ant-design/pro-components';
import { Menu } from 'antd';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import { commonMessages } from 'app/messages';
import React, { useRef, useLayoutEffect, useCallback } from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import i18next from 'i18next';
import {
  BaseView,
  LeftMenu,
  NotificationView,
  PreferenceView,
  RightMenu,
  SecurityView,
  UserSettingContainer,
} from './components';
import { messages } from './messages';
import {
  BellOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';

type SettingsStateKeys = 'base' | 'security' | 'preference' | 'notification';
type SettingsState = {
  mode: 'inline' | 'horizontal';
  selectKey: SettingsStateKeys;
};

const SettingTitle = styled.span`
  .anticon {
    margin-right: 5px;
  }
`;
export const UserSettingPage = () => {
  const { t } = i18next;
  const [initConfig, setInitConfig] = useState<SettingsState>({
    mode: 'inline',
    selectKey: 'base',
  });
  const refDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (refDiv.current) {
      window.addEventListener('resize', resize);
    }
    return () => {
      window.removeEventListener('resize', resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const resize = useCallback(() => {
    requestAnimationFrame(() => {
      if (!refDiv.current) {
        return;
      }
      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = refDiv.current;
      if (refDiv.current.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }

      if (initConfig.mode !== mode) {
        setInitConfig({ ...initConfig, mode: mode as SettingsState['mode'] });
      }
    });
  }, [initConfig]);

  const renderChildren = React.useMemo(() => {
    const { selectKey } = initConfig;
    switch (selectKey) {
      case 'base':
        return <BaseView />;
      case 'preference':
        return <PreferenceView />;
      case 'security':
        return <SecurityView />;
      case 'notification':
        return <NotificationView />;
      default:
        return null;
    }
  }, [initConfig]);

  const items: MenuItemType[] = [
    {
      label: (
        <SettingTitle>
          <UserOutlined rev={undefined} />
          {t(messages.personalInformation())}
        </SettingTitle>
      ),
      key: 'base',
    },
    {
      label: (
        <SettingTitle>
          <SettingOutlined rev={undefined} />
          {t(messages.preferenceSetting())}
        </SettingTitle>
      ),
      key: 'preference',
    },
    {
      label: (
        <SettingTitle>
          <SafetyCertificateOutlined rev={undefined} />
          {t(messages.securitySetting())}
        </SettingTitle>
      ),
      key: 'security',
    },
    {
      label: (
        <SettingTitle>
          <BellOutlined rev={undefined} />
          {t(messages.notificationSetting())}
        </SettingTitle>
      ),
      key: 'notification',
    },
  ];

  return (
    <PageContainer
      header={{
        title: t(commonMessages.userSettingMenu()),
      }}
    >
      <Helmet>
        <title>{t(commonMessages.userProfileMenu())}</title>
      </Helmet>

      <GridContent>
        <UserSettingContainer ref={refDiv}>
          <LeftMenu>
            <Menu
              mode={initConfig.mode}
              selectedKeys={[initConfig.selectKey]}
              onClick={({ key }) => {
                setInitConfig({
                  ...initConfig,
                  selectKey: key as SettingsStateKeys,
                });
              }}
              items={items}
            />
          </LeftMenu>
          <RightMenu>
            <div className="title">
              {items.find(x => x.key === initConfig.selectKey)?.label}
            </div>
            {renderChildren}
          </RightMenu>
        </UserSettingContainer>
      </GridContent>
    </PageContainer>
  );
};
