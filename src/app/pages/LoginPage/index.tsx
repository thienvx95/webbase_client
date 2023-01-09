import Footer from 'app/components/Footer';
import { GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  PageLoading,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { commonMessages } from 'app/messages';
import { Helmet } from 'react-helmet-async';
import { messages } from './messages';
import { useSelector } from 'react-redux';
import { selectError } from 'providers/auth/slice/selectors';
import {
  LoginMessage,
  LoginContainer,
  LoginFormContainer,
  LoginTopHeaderWrapper,
  LoginSupporterContainer,
} from './components';
import { LanguageSwitch } from 'app/components/LanguageSwitch';
import { ThemeSwitch } from 'app/components/ThemeSwitch';
import { ForgotPassword } from './components/forgotPassword';
import { AuthParams } from 'api/auth/models';
import { useAuth } from 'utils/hooks/useAuth';
import { selectLoading } from 'providers/layout/slice/selectors';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { login, removeLoginError } = useAuth();
  const [buttonLoading, setButtonLoading] = useState(false);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);

  useEffect(() => {
    setButtonLoading(false);
  }, [error]);

  return !loading ? (
    <LoginContainer>
      <Helmet>
        <title>{t(commonMessages.loginMenu())}</title>
      </Helmet>
      <LoginTopHeaderWrapper>
        <ThemeSwitch />
        <LanguageSwitch />
      </LoginTopHeaderWrapper>
      <LoginFormContainer>
        <LoginForm
          submitter={{
            searchConfig: {
              submitText: t(messages.login()),
            },
            submitButtonProps: {
              loading: buttonLoading,
            },
          }}
          logo={<img alt="logo" src="/logo.png" />}
          title={t(messages.loginTitle())}
          subTitle={t(messages.loginTitle())}
          initialValues={{
            autoLogin: true,
          }}
          actions={[
            <span key="loginWith">{t(messages.loginWith())}:</span>,
            <GoogleOutlined key="GoogleOutlined" className="icon" />,
          ]}
          onFinish={async values => {
            setButtonLoading(true);
            await login(values as AuthParams);
          }}
          onFieldsChange={() => {
            if (error != null) {
              removeLoginError();
            }
          }}
        >
          {error != null && (
            <LoginMessage
              content={t(messages.loginErrorMessage(error.code?.toString()))}
            />
          )}
          <ProFormText
            name="username"
            fieldProps={{
              size: 'large',
              prefix: <UserOutlined />,
            }}
            placeholder={t(messages.usernamePlaceHolder())}
            rules={[
              {
                required: true,
                message: t(messages.usernameRequired()),
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined />,
            }}
            placeholder={t(messages.passwordPlaceHolder())}
            rules={[
              {
                required: true,
                message: t(messages.passwordRequired()),
              },
            ]}
          />
          <LoginSupporterContainer>
            <ProFormCheckbox noStyle name="autoLogin">
              {t(messages.rememberMe())}
            </ProFormCheckbox>
            <ForgotPassword href="#" onClick={() => {}} />
          </LoginSupporterContainer>
        </LoginForm>
      </LoginFormContainer>
      <Footer />
    </LoginContainer>
  ) : (
    <PageLoading />
  );
};
