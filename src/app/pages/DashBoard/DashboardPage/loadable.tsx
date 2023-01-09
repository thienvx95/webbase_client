import { PageLoading } from '@ant-design/pro-components';
import * as React from 'react';
import { lazyLoad } from 'utils/loadable';

export const DashboardPage = lazyLoad(
  () => import('./index'),
  module => module.DashboardPage,
  {
    fallback: <PageLoading />,
  },
);
