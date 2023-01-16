import { LoadingOutlined, UploadOutlined } from '@ant-design/icons';
import { Upload, Button } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { Notification } from 'app/components/Notification';
import { buttonMessages, formMessages } from 'app/messages';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

export const AvatarView = ({ avatar }: { avatar: string }) => {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      Notification.error('LimitFileUpload', ['JPG/PNG']);
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      Notification.error('LimitFileSizeUpload', ['Avatar', '2MB']);
    }
    return isJpgOrPng && isLt2M;
  };

  const handleChange: UploadProps['onChange'] = (
    info: UploadChangeParam<UploadFile>,
  ) => {
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      console.log(info);
    }
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
