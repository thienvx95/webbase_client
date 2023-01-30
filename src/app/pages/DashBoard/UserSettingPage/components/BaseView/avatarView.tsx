import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Upload, Button } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { UserAPI } from 'api/user/userApi';
import { Notification } from 'app/components/Notification';
import { buttonMessages, formMessages } from 'app/messages';
import { authenticateActions } from 'providers/auth/slice';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

export const AvatarView = ({ avatar }: { avatar: string }) => {
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const beforeUpload = (file: RcFile) => {
    setLoading(true);
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      Notification.error('LimitFileUpload', ['JPG/PNG']);
      setFileList([]);
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Notification.error('LimitFileSizeUpload', ['Avatar', '2MB']);
      setFileList([]);
      return false;
    }
    setFileList([file]);
    return false;
  };

  const handleChange: UploadProps['onChange'] = async () => {
    if (fileList.length) {
      const result = await UserAPI.uploadAvatar(fileList);
      if (result.success) {
        dispatch(authenticateActions.fetchCurrentUser());
        Notification.success('update');
      } else {
        Notification.error('200');
      }
    }
    setLoading(false);
  };

  return (
    <>
      <div className="avatar_title">{t(formMessages.title('avatar'))}</div>
      <div className="avatar">
        <img src={avatar} alt="avatar" />
      </div>
      <Upload
        showUploadList={false}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        maxCount={1}
        fileList={fileList}
      >
        <div className="button_view">
          <Button>
            {loading ? <LoadingOutlined /> : <UploadOutlined />}
            {t(buttonMessages.upload())}
          </Button>
        </div>
      </Upload>
    </>
  );
};
