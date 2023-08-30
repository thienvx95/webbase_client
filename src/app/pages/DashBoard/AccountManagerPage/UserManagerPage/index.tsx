import {
  PageContainer,
  ProCard,
  ActionType,
  ProColumns,
} from '@ant-design/pro-components';
import { Badge, Tag } from 'antd';
import { UserDetail } from 'api/user/models';
import { UserAPI } from 'api/user/userApi';
import { DataTable } from 'app/components/Table';
import { commonMessages, tableMessages } from 'app/messages';
import moment from 'moment';
import * as React from 'react';
import { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { messages } from '../../UserSettingPage/messages';

export function UserManagerPage() {
  const { t } = useTranslation();

  const actionRef = useRef<ActionType>();

  const dataColumns: ProColumns<UserDetail>[] = React.useMemo(
    () => [
      {
        title: t(tableMessages.userManagement('fullName')),
        render: (data: any) => {
          return (
            <>
              {data.firstName ?? ''} {data.lastName ?? ''}
            </>
          );
        },
      },
      {
        title: t(tableMessages.userManagement('userName')),
        dataIndex: 'username',
        key: 'username',
      },
      {
        title: t(tableMessages.userManagement('email')),
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: t(tableMessages.userManagement('mobile')),
        dataIndex: 'mobile',
        key: 'mobile',
      },
      {
        title: t(tableMessages.userManagement('role')),
        dataIndex: 'roles',
        key: 'roles',
        render: (data: any) => {
          return (
            <>
              {data.map(tag => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </>
          );
        },
      },
      {
        title: t(tableMessages.userManagement('status')),
        dataIndex: 'isActive',
        key: 'isActive',
        render: (data: any) => {
          return (
            <Badge
              status={data ? 'success' : 'error'}
              text={
                data
                  ? t(tableMessages.userManagement('active'))
                  : t(tableMessages.userManagement('inActive'))
              }
            />
          );
        },
      },
    ],
    [t],
  );

  return (
    <PageContainer>
      <Helmet>
        <title>{t(commonMessages.users())}</title>
      </Helmet>
      <ProCard
        style={{
          height: '70vh',
        }}
      >
        <DataTable<UserDetail>
          columns={dataColumns}
          fetchData={UserAPI.findPaging}
          actionRef={actionRef}
          pagination={{ showSizeChanger: false }}
          pageSize={5}
          // rowAction={{
          //   deleteAction: UserAPI.delete,
          // }}
          // headTitle={t(messages()) || ''}
          // toolBar={{
          //   showToolBar: true,
          //   deleteAllAction: UserAPI.deleteAllLogActivity,
          // }}
        />
      </ProCard>
    </PageContainer>
  );
}
