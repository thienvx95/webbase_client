import { PageLoading } from '@ant-design/pro-components';
import * as React from 'react';
import { lazyLoad } from 'utils/loadable';

export const UserProfilePage = lazyLoad(
  () => import('./index'),
  module => module.UserProfilePage,
  {
    fallback: <PageLoading />,
  },
);
