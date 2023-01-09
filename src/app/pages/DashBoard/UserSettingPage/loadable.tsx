import { PageLoading } from '@ant-design/pro-components';
import * as React from 'react';
import { lazyLoad } from 'utils/loadable';

export const UserSettingPage = lazyLoad(
  () => import('./index'),
  module => module.UserSettingPage,
  {
    fallback: <PageLoading />,
  },
);
