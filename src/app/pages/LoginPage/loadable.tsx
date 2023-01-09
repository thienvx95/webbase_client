import { PageLoading } from '@ant-design/pro-components';
import * as React from 'react';
import { lazyLoad } from 'utils/loadable';

export const LoginPage = lazyLoad(
  () => import('./index'),
  module => module.LoginPage,
  {
    fallback: <PageLoading />,
  },
);
