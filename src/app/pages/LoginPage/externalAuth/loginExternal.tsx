import { LoginPageSetting } from 'api/setting/models/loginPageSetting';
import React from 'react';
import { t } from 'i18next';
import { messages } from '../messages';
import GoogleAuth from './googleAuth';
import FacebookAuth from './facebookAuth';

export interface loginExternalProps {
  settings: LoginPageSetting;
}

export function loginExternalRender({
  settings,
}: loginExternalProps): React.ReactNode[] {
  let providers: React.ReactNode[] = [];
  if (!settings.enableFacebookAuth && !settings.enableGoogleAuth) {
    return providers;
  }
  providers.push(<span key="loginWith">{t(messages.loginWith())}:</span>);
  if (settings.enableGoogleAuth) {
    providers.push(<GoogleAuth key="googleAuth" settings={settings} />);
  }

  if (settings.enableFacebookAuth) {
    providers.push(<FacebookAuth key="facebookAuth" settings={settings} />);
  }

  return providers;
}
