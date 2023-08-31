import { ActionType, PageContainer, ProCard, ProColumns } from '@ant-design/pro-components';
import { RoleDetail } from 'api/role/models';
import { RoleApi } from 'api/role/roleApi';
import { DataTable } from 'app/components/Table';
import { commonMessages, tableMessages } from 'app/messages';
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

export function RoleManagerPage() {
  const { t } = useTranslation();

  const actionRef = React.useRef<ActionType>();

  const dataColumns: ProColumns<RoleDetail>[] = React.useMemo(
    () => [
      {
        title: t(tableMessages.userManagement('name')),
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: t(tableMessages.userManagement('description')),
        dataIndex: 'description',
        key: 'description',
      },
    ],
    [t],
  );

  return (
    <PageContainer>
      <Helmet>
        <title>{t(commonMessages.roles())}</title>
      </Helmet>
      <ProCard
        style={{
          height: '70vh',
        }}
      >
        <DataTable<RoleDetail>
          columns={dataColumns}
          fetchData={RoleApi.findPaging}
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
