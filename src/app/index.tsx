/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  BrowserRouter,
  Routes,
  useNavigate,
  NavigateFunction,
} from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { useTranslation } from 'react-i18next';
import { AuthProvider } from 'providers/auth/authProvider';
import { HomeRoute } from 'app/layouts/homeLayout';
import { ProtectedRoute } from 'app/layouts/protectedLayout';
import { LoginRoute } from './layouts/loginLayout';

export let globalNavigate: NavigateFunction;

export const GlobalHistory = () => {
  globalNavigate = useNavigate();

  return null;
};

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <GlobalHistory />
      <Helmet
        titleTemplate="%s - Web Application"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Web application" />
      </Helmet>
      <AuthProvider>
        <Routes>
          {HomeRoute()}
          {LoginRoute()}
          {ProtectedRoute()}
        </Routes>
      </AuthProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}
