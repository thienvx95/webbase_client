import { GridContent, PageContainer } from '@ant-design/pro-components';
import { Menu } from 'antd';
import { commonMessages } from 'app/messages';
import { selectLoading } from 'providers/layout/slice/selectors';
import * as React from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  BaseView,
  LeftMenu,
  NotificationView,
  RightMenu,
  SecurityView,
  UserSettingContainer,
} from './components';
import { messages } from './messages';

const { Item } = Menu;

type SettingsStateKeys = 'base' | 'security' | 'binding' | 'notification';
type SettingsState = {
  mode: 'inline' | 'horizontal';
  selectKey: SettingsStateKeys;
};

export const UserSettingPage = () => {
  const { t } = useTranslation();
  const [initConfig, setInitConfig] = useState<SettingsState>({
    mode: 'inline',
    selectKey: 'base',
  });
  const loading = useSelector(selectLoading);

  const dom = React.useRef<HTMLDivElement>();

  const resize = () => {
    requestAnimationFrame(() => {
      if (!dom.current) {
        return;
      }
      let mode: 'inline' | 'horizontal' = 'inline';
      const { offsetWidth } = dom.current;
      if (dom.current.offsetWidth < 641 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      if (window.innerWidth < 768 && offsetWidth > 400) {
        mode = 'horizontal';
      }
      setInitConfig({ ...initConfig, mode: mode as SettingsState['mode'] });
    });
  };

  React.useLayoutEffect(() => {
    if (dom.current) {
      window.addEventListener('resize', resize);
      resize();
    }
    return () => {
      window.removeEventListener('resize', resize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dom.current]);

  const renderChildren = () => {
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
  };

  const menuMap: Record<string, React.ReactNode> = {
    base: t(messages.baseSetting()),
    security: t(messages.securitySetting()),
    notification: t(messages.notificationSetting()),
  };

  const getMenu = React.useCallback(() => {
    return Object.keys(menuMap).map(item => (
      <Item key={item}>{menuMap[item]}</Item>
    ));
  }, []);

  return (
    <PageContainer
      loading={loading}
      header={{
        title: t(commonMessages.userSettingMenu()),
      }}
    >
      <Helmet>
        <title>{t(commonMessages.userProfileMenu())}</title>
      </Helmet>

      <GridContent>
        <UserSettingContainer
          ref={ref => {
            if (ref) {
              dom.current = ref;
            }
          }}
        >
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
            >
              {getMenu()}
            </Menu>
          </LeftMenu>
          <RightMenu>
            <div className="title">{menuMap[initConfig.selectKey]}</div>
            {renderChildren()}
          </RightMenu>
        </UserSettingContainer>
      </GridContent>
    </PageContainer>
  );
};
