/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';

import { HomePage } from 'app/pages/HomePage/Loadable';
import { useTranslation } from 'react-i18next';
import { AuthProvider } from 'providers/authProvider';
import { HomeLayout } from 'app/layouts/homeLayout';
import { LoginPage } from 'app/pages/LoginPage';
import { ProtectedLayout } from 'app/layouts/protectedLayout';

export function App() {
  const { i18n } = useTranslation();
  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Web Application"
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="Web application" />
      </Helmet>
      <AuthProvider>
        <Routes>
          <Route element={<HomeLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route path="/dashboard" element={<ProtectedLayout />}></Route>
        </Routes>
      </AuthProvider>
      <GlobalStyle />
    </BrowserRouter>
  );
}
