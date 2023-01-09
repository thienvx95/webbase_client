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
import { isEmpty } from 'lodash';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useOutlet } from 'react-router-dom';
import styled from 'styled-components';
import RightContent from './RightContent';

const ProLayoutContainer = styled.div`
  .ant-pro-layout-container {
    min-height: 100vh !important;
  }
`;

export const DashboardLayout = props => {
  const dispatch = useDispatch();
  const { updateSettings, fetchMenu } = layoutActions;
  const settings = useSelector(selectDashboardSettings);

  const outlet = useOutlet();
  useEffect(() => {
    dispatch(fetchMenu());
  }, []);
  const menu = useSelector(selectMenus);
  if (isEmpty(menu)) {
    return <PageLoading />;
  }

  const request = async (params: any, defaultMenuData: MenuDataItem[]) => {
    return menu;
  };
  return (
    <ProLayoutContainer id="dashboard-container">
      <ProLayout
        logo={<img alt="logo" src="/logo.png" />}
        title={'Web Application'}
        footerRender={() => <Footer />}
        rightContentRender={() => <RightContent />}
        isMobile={true}
        menu={{ request: request }}
      >
        {outlet}
      </ProLayout>
      <SettingDrawer
        enableDarkTheme
        getContainer={() => document.getElementById('dashboard-container')}
        settings={settings}
        onSettingChange={setting => dispatch(updateSettings(setting))}
        disableUrlParams={true}
        hideCopyButton={true}
        hideHintAlert={true}
      />
    </ProLayoutContainer>
  );
};
