import Footer from 'app/components/Footer';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  PageLoading,
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
  LoginSupporter,
  LoginTopHeader,
} from './components';
import { AuthParams } from 'api/auth/models';
import { useAuth } from 'utils/hooks/useAuth';
import { selectLoading } from 'providers/layout/slice/selectors';
import { useSettings } from 'utils/hooks/useSettings';
import { PageSettingEnum } from 'api/setting/models/pageSettingEnum';
import { selectLoginSettings } from 'providers/settings/slice/selectors';
import { loginExternalRender } from './externalAuth/loginExternal';

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  const { login, removeLoginError } = useAuth();
  const { fetchPageSetting } = useSettings();
  const [buttonLoading, setButtonLoading] = useState(false);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const loginSettings = useSelector(selectLoginSettings);
  useEffect(() => {
    fetchPageSetting(PageSettingEnum.Login);
  }, []);

  useEffect(() => {
    setButtonLoading(false);
  }, [error]);

  return !loading ? (
    <LoginContainer>
      <Helmet>
        <title>{t(commonMessages.loginMenu())}</title>
      </Helmet>
      <LoginTopHeader />
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
          actions={
            loginSettings
              ? loginExternalRender({ settings: loginSettings })
              : []
          }
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
              prefix: <UserOutlined rev={undefined} />,
            }}
            placeholder={t(messages.usernamePlaceHolder()) ?? ''}
            rules={[
              {
                required: true,
                message: t(messages.usernameRequired()) ?? '',
              },
            ]}
          />
          <ProFormText.Password
            name="password"
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined rev={undefined} />,
            }}
            placeholder={t(messages.passwordPlaceHolder()) ?? ''}
            rules={[
              {
                required: true,
                message: t(messages.passwordRequired()) ?? '',
              },
            ]}
          />
          {loginSettings ? <LoginSupporter settings={loginSettings} /> : null}
        </LoginForm>
      </LoginFormContainer>
      <Footer />
    </LoginContainer>
  ) : (
    <PageLoading />
  );
};
