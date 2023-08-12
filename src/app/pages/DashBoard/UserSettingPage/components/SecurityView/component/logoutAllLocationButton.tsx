import { Button } from 'antd';
import { UserProfileAPI } from 'api/user/userProfileApi';
import { buttonMessages } from 'app/messages';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutingPath } from 'utils/constants';
import { CacheKey, StorageUtil } from 'utils/storageUtil';

export const LogoutAllLocationButton: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const onClick = async () => {
    const result = await UserProfileAPI.logoutAllLocations();
    if (result.success) {
      StorageUtil.remove(CacheKey.WebApiRefreshhToken);
      StorageUtil.remove(CacheKey.WebApiToken);
      navigate(RoutingPath.Login, { replace: true });
    }
  };
  return (
    <Button danger onClick={onClick}>
      {t(buttonMessages.logoutAllLocation())}
    </Button>
  );
};
