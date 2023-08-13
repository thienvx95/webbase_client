import { ProColumns, ProTable } from '@ant-design/pro-components';
import { ResponseResult } from 'api/common/models';
import { PaginateParams } from 'api/common/models/paginateParams';
import { PaginateResult } from 'api/common/models/paginateResult';
import { tableMessages } from 'app/messages';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { pageSizeOptions } from 'utils/constants';
import { RowActionProps, rowActions } from './component/RowActions';
import { toolBarRender, ToolBarProps } from './component/ToolBar';

interface IDataTable<T> {
  actionRef: any;
  onCreateClick?: any;
  fetchData: (
    request: PaginateParams,
  ) => Promise<ResponseResult<PaginateResult<T>>>;
  columns: ProColumns<T>[];
  isShowCreate?: boolean;
  isShowOption?: boolean;
  pagination?: Pagination;
  isShowSearch?: boolean;
  pageSize?: number;
  rowAction?: RowActionProps;
  toolBar?: ToolBarProps;
  headTitle?: string;
  options?: OptionConfig;
}

interface Pagination {
  showSizeChanger: boolean;
}

interface OptionConfig {
  des;
}

const ProTableContainer = styled.div`
  .ant-btn > span {
    display: inline-flex;
  }
`;

export function DataTable<T extends Record<string, any>>({
  actionRef,
  onCreateClick,
  fetchData,
  columns,
  isShowCreate,
  options,
  pagination,
  isShowSearch,
  pageSize = 10,
  rowAction,
  toolBar,
  headTitle,
}: IDataTable<T>) {
  const { t } = useTranslation();
  const dataColumns = useMemo(() => {
    var colummsClone = [...columns];
    if (rowAction) {
      colummsClone.push({
        title: t(tableMessages.action()),
        hideInSearch: true,
        render: (_, entity) => rowActions(rowAction, entity, actionRef),
      });
    }
    return colummsClone;
  }, [actionRef, columns, rowAction, t]);
  return (
    <ProTableContainer>
      <ProTable<T>
        rowKey="_id"
        columns={dataColumns}
        search={
          isShowSearch
            ? {
                labelWidth: 120,
              }
            : false
        }
        actionRef={actionRef}
        request={async (params, sort, filter) => {
          const { pageSize, current, keyword, ...search } = params;
          const { success, data } = (await fetchData({
            limit: pageSize,
            page: current,
            sort,
            filter,
            search: { ...search },
          })) as ResponseResult<PaginateResult<T>>;

          if (success) {
            const { docs, totalDocs } = data;
            return {
              data: docs,
              success: true,
              total: totalDocs,
            };
          }

          return {
            data: [],
            success: false,
            total: 0,
          };
        }}
        headerTitle={headTitle}
        options={{
          setting: false,
          density: false,
          reload: () => {
            actionRef.current.reloadAndRest();
          },
        }}
        size="large"
        pagination={
          pagination
            ? {
                pageSize: pageSize,
                pageSizeOptions: pageSizeOptions,
                showSizeChanger: pagination.showSizeChanger,
                responsive: true,
              }
            : false
        }
        toolBarRender={
          toolBar ? () => toolBarRender(toolBar, actionRef) : false
        }
      />
    </ProTableContainer>
  );
}
