import { PageContainer, ProCard } from '@ant-design/pro-components';
import { Skeleton } from 'antd';
import { commonMessages } from 'app/messages';
import { selectLoading } from 'providers/layout/slice/selectors';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RoutingPath } from 'utils/constants';

export function UserProfilePage() {
  const { t } = useTranslation();
  const loading = useSelector(selectLoading);
  return (
    <PageContainer
      loading={loading}
      header={{
        title: t(commonMessages.userProfileMenu()),
        breadcrumb: {
          routes: [
            {
              path: RoutingPath.Dashboard,
              breadcrumbName: t(commonMessages.dashboardMenu()),
            },
            {
              path: RoutingPath.UserProfile,
              breadcrumbName: t(commonMessages.userProfileMenu()),
            },
          ],
        },
      }}
    >
      <Helmet>
        <title>{t(commonMessages.userProfileMenu())}</title>
      </Helmet>

      <ProCard direction="column" ghost gutter={[0, 16]}>
        <ProCard style={{ height: 200 }}>
          <Skeleton></Skeleton>
        </ProCard>
      </ProCard>
    </PageContainer>
  );
}
