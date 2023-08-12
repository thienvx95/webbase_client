import React, { useCallback } from 'react';
import { Button, Modal } from 'antd';
import { buttonMessages, modalMessages } from 'app/messages';
import { useTranslation } from 'react-i18next';
import { Notification } from 'app/components/Notification';
import { ResponseResult } from 'api/common/models';

interface DeleteAllButtonProps {
  deleteAction: () => Promise<ResponseResult<boolean>>;
  actionRef: any;
}
export const DeleteAllButton: React.FC<DeleteAllButtonProps> = ({
  actionRef,
  deleteAction,
}) => {
  const { t } = useTranslation();
  const DeleteConfirm = () =>
    useCallback(() => {
      Modal.confirm({
        title: t(modalMessages.deleteAllConfirm('title')),
        content: t(modalMessages.deleteAllConfirm('description')),
        okText: t(buttonMessages.ok()),
        cancelText: t(buttonMessages.cancel()),
        onOk: async () => {
          const result = await deleteAction();
          if (result.success) {
            Notification.success('delete');
            actionRef.current?.reloadAndRest();
          }
          return Promise.resolve();
        },
      });
    }, []);

  return (
    <Button type="primary" danger onClick={DeleteConfirm()}>
      {t(buttonMessages.deleteAll())}
    </Button>
  );
};
