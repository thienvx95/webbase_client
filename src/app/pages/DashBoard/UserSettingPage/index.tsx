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
  RightMenu,
  SecurityView,
  UserSettingContainer,
} from './components';
import { messages } from './messages';

type SettingsStateKeys = 'base' | 'security' | 'binding' | 'notification';
type SettingsState = {
  mode: 'inline' | 'horizontal';
  selectKey: SettingsStateKeys;
};

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
  }, []);

  const renderChildren = React.useMemo(() => {
    const { selectKey } = initConfig;
    switch (selectKey) {
      case 'base':
        return <BaseView />;
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
      label: t(messages.baseSetting()),
      key: 'base',
    },
    {
      label: t(messages.securitySetting()),
      key: 'security',
    },
    {
      label: t(messages.notificationSetting()),
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
