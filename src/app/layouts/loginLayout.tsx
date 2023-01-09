import React from 'react';
import { useAuth } from 'utils/hooks/useAuth';
import { Navigate, Route, useOutlet } from 'react-router-dom';
import { RoutingPath } from 'utils/constants';
import { useSelector } from 'react-redux';
import { selectLoading } from 'providers/layout/slice/selectors';
import { PageLoading } from '@ant-design/pro-components';
import { LoginPage } from 'app/pages/LoginPage';

export const LoginLayout = () => {
  const { isAuthenticated } = useAuth();
  const outlet = useOutlet();
  const loading = useSelector(selectLoading);
  if (isAuthenticated()) {
    return loading ? (
      <PageLoading />
    ) : (
      <Navigate to={RoutingPath.Dashboard} replace />
    );
  }

  return <>{outlet}</>;
};

export const LoginRoute = () => {
  return (
    <Route element={<LoginLayout />}>
      <Route path="/login" element={<LoginPage />} />
    </Route>
  );
};
