import React, { ReactNode } from 'react';
import { ResponseResult } from 'api/common/models';
import { DeleteRowButton } from './deleteRowButton';

export interface RowActionProps {
  deleteAction?: (id: string) => Promise<ResponseResult<boolean>>;
}

export function rowActions(
  rowActions: RowActionProps,
  entity: Record<string, any>,
  actionRef: any,
): React.ReactFragment {
  let actions: Array<ReactNode> = [];
  if (rowActions.deleteAction) {
    actions.push(
      <DeleteRowButton
        key={`delete-${entity._id}`}
        id={entity._id}
        deleteAction={rowActions.deleteAction}
        actionRef={actionRef}
      />,
    );
  }
  return actions;
}
