import { ProFormCheckbox } from '@ant-design/pro-components';
import { LoginPageSetting } from 'api/setting/models/loginPageSetting';
import React from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro';
import { messages } from '../messages';
import { ForgotPassword } from './forgotPassword';

const LoginSupporterContainer = styled.div`
  margin-bottom: 24px;
`;

interface LoginSupporterProps {
  settings: LoginPageSetting;
}

export const LoginSupporter = ({ settings }: LoginSupporterProps) => {
  const { t } = useTranslation();
  return (
    <LoginSupporterContainer>
      {settings?.enableRembemerAuth ? (
        <ProFormCheckbox noStyle name="autoLogin">
          {t(messages.rememberMe())}
        </ProFormCheckbox>
      ) : null}
      {settings?.enableForgotPassword ? (
        <ForgotPassword href="#" onClick={() => {}} />
      ) : null}
    </LoginSupporterContainer>
  );
};
