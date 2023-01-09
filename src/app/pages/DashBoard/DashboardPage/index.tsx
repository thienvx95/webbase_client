import { PageContainer } from '@ant-design/pro-components';
import { commonMessages } from 'app/messages';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export function DashboardPage() {
  const { t } = useTranslation();
  return (
    <PageContainer>
      <Helmet>
        <title>{t(commonMessages.dashboardMenu())}</title>
      </Helmet>
      <span>My HomePage</span>
    </PageContainer>
  );
}
