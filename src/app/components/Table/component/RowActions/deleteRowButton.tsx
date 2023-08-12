import React, { useCallback } from 'react';
import { DeleteOutlined } from '@ant-design/icons';
import { Tooltip, Button, Modal } from 'antd';
import { buttonMessages, modalMessages } from 'app/messages';
import { useTranslation } from 'react-i18next';
import { Notification } from 'app/components/Notification';
import { ResponseResult } from 'api/common/models';

interface DeleteRowButtonProps {
  id: string;
  deleteAction: (id: string) => Promise<ResponseResult<boolean>>;
  actionRef: any;
}
export const DeleteRowButton: React.FC<DeleteRowButtonProps> = ({
  id,
  actionRef,
  deleteAction,
}) => {
  const { t } = useTranslation();
  const DeleteConfirm = (id: string) =>
    useCallback(() => {
      Modal.confirm({
        title: t(modalMessages.deleteConfirm('title')),
        content: t(modalMessages.deleteConfirm('description')),
        okText: t(buttonMessages.ok()),
        cancelText: t(buttonMessages.cancel()),
        onOk: async () => {
          const result = await deleteAction(id);
          if (result.success) {
            Notification.success('delete');
            actionRef.current?.reloadAndRest();
          }
          return Promise.resolve();
        },
      });
    }, [id]);

  return (
    <Tooltip title={t(buttonMessages.delete())}>
      <Button
        shape="circle"
        onClick={DeleteConfirm(id)}
        icon={<DeleteOutlined />}
      />
    </Tooltip>
  );
};
