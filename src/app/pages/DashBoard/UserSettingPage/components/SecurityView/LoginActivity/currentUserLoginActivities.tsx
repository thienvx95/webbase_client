import { UserLoginActivity } from 'api/user/models';
import React, { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectCurrentUserLoginActivity } from '../../../slice/selectors';
import {
  ActionType,
  PageLoading,
  ProColumns,
} from '@ant-design/pro-components';
import 'antd/lib/locale/en_GB';
import { tableMessages } from 'app/messages';
import moment from 'moment';
import { DataTable } from 'app/components/Table';
import { messages } from './messages';
import { UserProfileAPI } from 'api/user/userProfileApi';

export const CurrentUserLoginActivities: React.FC = () => {
  const { t } = useTranslation();
  const userLoginActivity = useSelector(selectCurrentUserLoginActivity);

  const actionRef = useRef<ActionType>();

  const dataColumns: ProColumns<UserLoginActivity>[] = useMemo(
    () => [
      {
        title: t(tableMessages.userActivities('ipAddress')),
        dataIndex: 'ipAddress',
        key: 'ipAddress',
      },
      {
        title: t(tableMessages.userActivities('browser')),
        dataIndex: 'browser',
        key: 'browser',
      },
      {
        title: t(tableMessages.userActivities('platform')),
        dataIndex: 'platform',
        key: 'platform',
      },

      {
        title: t(tableMessages.userActivities('os')),
        dataIndex: 'os',
        key: 'os',
      },
      {
        title: t(tableMessages.userActivities('loginTime')),
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: (date: React.ReactNode) => {
          return <p>{moment(date?.toString()).format('LLL')}</p>;
        },
      },
    ],
    [t],
  );

  return userLoginActivity ? (
    <DataTable<UserLoginActivity>
      columns={dataColumns}
      fetchData={UserProfileAPI.getCurrentUserLoginActivities}
      actionRef={actionRef}
      pagination={{ showSizeChanger: false }}
      pageSize={5}
      rowAction={{
        deleteAction: UserProfileAPI.deleteLogActivity,
      }}
      headTitle={t(messages.title()) || ''}
      toolBar={{
        showToolBar: true,
        deleteAllAction: UserProfileAPI.deleteAllLogActivity,
      }}
    />
  ) : (
    <PageLoading />
  );
};
