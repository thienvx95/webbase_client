import { GoogleOutlined, LoadingOutlined } from '@ant-design/icons';
import { AuthAPI } from 'api/auth/authApi';
import React, { useState } from 'react';
import { GoogleOAuthProvider, useGoogleLogin } from '@react-oauth/google';
import { Button, Tooltip } from 'antd';
import styled from 'styled-components';
import { Notification } from 'app/components/Notification';
import { CacheKey, StorageUtil } from 'utils/storageUtil';
import { useNavigate } from 'react-router-dom';
import { RoutingPath } from 'utils/constants';
import { LoginPageSetting } from 'api/setting/models/loginPageSetting';

interface IGoolgeAuth {
  settings: LoginPageSetting;
}

const LoginButton = styled(Button)`
  margin-left: 10px;
`;

const GoogleAuth: React.FC<IGoolgeAuth> = ({ settings }) => {
  return settings.googleClientId !== '' ? (
    <GoogleOAuthProvider clientId={settings.googleClientId}>
      <GoogleButton />
    </GoogleOAuthProvider>
  ) : (
    <LoadingOutlined />
  );
};

const GoogleButton: React.FC = () => {
  const [enableAuth, setEnableAuth] = useState<boolean>(true);
  const navigate = useNavigate();
  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      AuthAPI.loginWithGoogle({
        code: tokenResponse.code,
        remmember: true,
      }).then(result => {
        if (result && result.success) {
          Notification.success('loginSuccess');
          if (result.data.token) {
            StorageUtil.set(
              CacheKey.WebApiToken,
              result.data.token,
              result.data.remmember,
            );
            StorageUtil.set(
              CacheKey.WebApiRefreshhToken,
              result.data.refreshToken,
              result.data.remmember,
            );
            navigate(RoutingPath.Dashboard, { replace: true });
          }
        }
      });
    },
    flow: 'auth-code',
    onError: () => {
      setEnableAuth(false);
    },
  });
  return (
    <Tooltip title="Google">
      <LoginButton
        disabled={!enableAuth}
        onClick={() => login()}
        icon={<GoogleOutlined />}
        shape="circle"
      />
    </Tooltip>
  );
};

export default GoogleAuth;
