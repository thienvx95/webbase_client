import {
  MenuDataItem,
  PageLoading,
  ProLayout,
  SettingDrawer,
  intlMap,
} from '@ant-design/pro-components';
import Footer from 'app/components/Footer';
import { layoutActions } from 'providers/layout/slice';
import {
  selectDashboardSettings,
  selectMenus,
} from 'providers/layout/slice/selectors';
import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useOutlet } from 'react-router-dom';
import styled from 'styled-components';
import isEqual from 'lodash/isEqual';
import { useRequest } from 'utils/hooks/useRequest';
import { useUserSettingSlice } from 'app/pages/DashBoard/UserSettingPage/slice';
import { ConfigProvider, Dropdown } from 'antd';
import { useTranslation } from 'react-i18next';
import { LanguageSwitch } from 'app/components/LanguageSwitch';
import { selectCurrentUser } from 'app/pages/DashBoard/UserSettingPage/slice/selectors';
import { LogoutOutlined, SettingOutlined } from '@ant-design/icons';
import { commonMessages } from 'app/messages';

const ProLayoutContainer = styled.div`
  .ant-pro-layout-container {
    min-height: 100vh !important;
  }
`;

export const DashboardLayout = () => {
  const { i18n, t } = useTranslation();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const { actions } = useUserSettingSlice();
  const dispatch = useDispatch();
  const outlet = useOutlet();
  const settings = useSelector(selectDashboardSettings);

  useEffect(() => {
    dispatch(actions.fetchCurrentUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { data: menus, loading } = useRequest<MenuDataItem[]>(
    layoutActions.fetchMenu,
    selectMenus,
  );

  const menuItems = useMemo(() => {
    return [
      {
        key: 'settings',
        icon: <SettingOutlined rev={undefined} />,
        label: t(commonMessages.userSettingMenu()),
      },
      {
        type: 'divider' as const,
      },
      {
        key: 'logout',
        icon: <LogoutOutlined rev={undefined} />,
        label: t(commonMessages.logoutMenu()),
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSettingChange = useCallback(
    newSettings => {
      if (!isEqual(newSettings, settings)) {
        dispatch(layoutActions.updateSettings(newSettings));
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [settings],
  );

  if (loading || menus === undefined) {
    return <PageLoading />;
  }
  return (
    <ConfigProvider locale={intlMap[i18n.language]}>
      <ProLayoutContainer id="dashboard-container">
        <ProLayout
          logo={<img alt="logo" src="/logo.png" />}
          title={'Web Application'}
          breadcrumbRender={routes => {
            return [
              {
                path: '/dashboard',
                title: 'Dashboard',
              },
              ...(routes || []),
            ];
          }}
          footerRender={() => <Footer />}
          actionsRender={() => [<LanguageSwitch />]}
          avatarProps={{
            size: 'small',
            src: currentUser?.avatar,
            shape: 'circle',
            title: `${currentUser?.firstName} ${currentUser?.lastName}`,
            render: (props, dom) => {
              return (
                <Dropdown
                  menu={{
                    items: menuItems,
                  }}
                >
                  {dom}
                </Dropdown>
              );
            },
          }}
          route={() => menus}
          isMobile={true}
          // menu={{
          //   request: async () => menus,
          // }}
          menuDataRender={() => menus}
          menuItemRender={(item, dom) => (
            <div
              onClick={() => {
                navigate(item.path ?? '', { replace: true });
              }}
            >
              {dom}
            </div>
          )}
          {...settings}
        >
          {outlet}
        </ProLayout>
        <SettingDrawer
          enableDarkTheme
          getContainer={() => document.getElementById('dashboard-container')}
          settings={settings}
          onSettingChange={onSettingChange}
          disableUrlParams={true}
          hideCopyButton={true}
          hideHintAlert={true}
        />
      </ProLayoutContainer>
    </ConfigProvider>
  );
};
