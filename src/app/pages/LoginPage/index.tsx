import Footer from 'app/components/Footer';
import { GoogleOutlined, LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  LoginForm,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import React, { useState } from 'react';
// import { flushSync } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { commonMessages } from 'app/messages';
import { Helmet } from 'react-helmet-async';
import { messages } from './messages';
import { useSelector } from 'react-redux';
import { selectAuthenticate } from 'app/pages/LoginPage/slice/selectors';
import { useAuthenticateFormSlice } from './slice';
import {
  LoginMessage,
  LoginContainer,
  LoginFormContainer,
  LoginTopHeaderWrapper,
} from './components';
import { LanguageSwitch } from 'app/components/LanguageSwitch';
import { ThemeSwitch } from 'app/components/ThemeSwitch';
// const Lang = () => {
//   const langClassName = useEmotionCss(({ token }) => {
//     return {
//       width: 42,
//       height: 42,
//       lineHeight: '42px',
//       position: 'fixed',
//       right: 16,
//       borderRadius: token.borderRadius,
//       ':hover': {
//         backgroundColor: token.colorBgTextHover,
//       },
//     };
//   });

//   return (
//     <div className={langClassName} data-lang>
//       {SelectLang && <SelectLang />}
//     </div>
//   );
// };

export const LoginPage: React.FC = () => {
  const { t } = useTranslation();
  // const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  //   const { initialState, setInitialState } = useModel('@@initialState');
  //   const fetchUserInfo = async () => {
  //     const userInfo = await initialState?.fetchUserInfo?.();
  //     if (userInfo) {
  //       flushSync(() => {
  //         setInitialState(s => ({
  //           ...s,
  //           currentUser: userInfo,
  //         }));
  //       });
  //     }
  //   };

  //   const handleSubmit = async (values: API.LoginParams) => {
  //     try {
  //       // 登录
  //       const msg = await login({ ...values, type });
  //       if (msg.status === 'ok') {
  //         message.success(t(messages.loginSuccessfull()));
  //         await fetchUserInfo();
  //         const urlParams = new URL(window.location.href).searchParams;
  //         history.push(urlParams.get('redirect') || '/');
  //         return;
  //       }
  //       console.log(msg);
  //       // 如果失败去设置用户错误信息
  //       setUserLoginState(msg);
  //     } catch (error) {
  //       const defaultLoginFailureMessage = intl.formatMessage({
  //         id: 'pages.login.failure',
  //         defaultMessage: '登录失败，请重试！',
  //       });
  //       console.log(error);
  //       message.error(defaultLoginFailureMessage);
  //     }
  //   };
  //   const { status, type: loginType } = userLoginState;
  var { actions } = useAuthenticateFormSlice();
  const { status } = useSelector(selectAuthenticate);
  return (
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
          contentStyle={{
            minWidth: 280,
            maxWidth: '75vw',
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
            // await handleSubmit(values as API.LoginParams);
          }}
        >
          {status === 'error' && (
            <LoginMessage content={t(messages.loginErrorMessage())} />
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
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <ProFormCheckbox noStyle name="autoLogin">
              {t(messages.rememberMe())}
            </ProFormCheckbox>
            <a
              href="/"
              role="button"
              style={{
                float: 'right',
              }}
              onClick={() => {}}
            >
              {t(messages.forgotPassword())}
            </a>
          </div>
        </LoginForm>
      </LoginFormContainer>
      <Footer />
    </LoginContainer>
  );
};
