import {
  MenuDataItem,
  PageLoading,
  ProLayout,
  SettingDrawer,
} from '@ant-design/pro-components';
import Footer from 'app/components/Footer';
import { layoutActions } from 'providers/layout/slice';
import {
  selectDashboardSettings,
  selectMenus,
} from 'providers/layout/slice/selectors';
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useOutlet } from 'react-router-dom';
import styled from 'styled-components';
import RightContent from './RightContent';
import isEqual from 'lodash/isEqual';
import { useRequest } from 'utils/hooks/useRequest';
import { useUserSettingSlice } from 'app/pages/DashBoard/UserSettingPage/slice';
const ProLayoutContainer = styled.div`
  .ant-pro-layout-container {
    min-height: 100vh !important;
  }
`;

export const DashboardLayout = () => {
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
    <ProLayoutContainer id="dashboard-container">
      <ProLayout
        logo={<img alt="logo" src="/logo.png" />}
        title={'Web Application'}
        footerRender={() => <Footer />}
        rightContentRender={() => <RightContent />}
        isMobile={true}
        menu={{
          request: async () => menus,
        }}
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
  );
};
