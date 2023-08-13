import { FacebookOutlined, LoadingOutlined } from '@ant-design/icons';
import React from 'react';
import { Button, Tooltip } from 'antd';
import styled from 'styled-components';
import { LoginPageSetting } from 'api/setting/models/loginPageSetting';

interface IGoolgeAuth {
  settings: LoginPageSetting;
}

const LoginButton = styled(Button)`
  margin-left: 10px;
`;

const FacebookAuth: React.FC<IGoolgeAuth> = ({ settings }) => {
  return settings.facebookeClientId !== '' ? (
    <FacebookButton />
  ) : (
    <LoadingOutlined rev={undefined} />
  );
};

const FacebookButton: React.FC = () => {
  const login = () => {};
  return (
    <Tooltip title="Facebook">
      <LoginButton
        onClick={() => login()}
        icon={<FacebookOutlined rev={undefined} />}
        shape="circle"
      />
    </Tooltip>
  );
};

export default FacebookAuth;
