import { ResponseResult } from 'api/common/models';
import React from 'react';
import { DeleteAllButton } from './deleteAllButton';

export interface ToolBarProps {
  showToolBar: boolean;
  deleteAllAction?: () => Promise<ResponseResult<boolean>>;
}

export function toolBarRender(
  props: ToolBarProps,
  actionRef: any,
): React.ReactNode[] {
  let actions: React.ReactNode[] = [];
  if (props.deleteAllAction) {
    actions.push(
      <DeleteAllButton
        key={`delete-all`}
        deleteAction={props.deleteAllAction}
        actionRef={actionRef}
      />,
    );
  }
  return actions;
}
