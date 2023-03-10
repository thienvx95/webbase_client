import { useAuth } from 'utils/hooks/useAuth';
import React from 'react';
import { Navigate, Route } from 'react-router-dom';
import { RoutingPath } from 'utils/constants';
import { DashboardLayout } from './dashboard';
import { DashboardPage } from 'app/pages/DashBoard/DashboardPage/loadable';
import DashboardNoFoundPage from 'app/pages/DashBoard/NotFoundPage';
import { UserSettingPage } from 'app/pages/DashBoard/UserSettingPage/loadable';

export const ProtectedLayout = props => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated()) {
    return <Navigate to={RoutingPath.Login} />;
  }
  return <DashboardLayout />;
};

export const ProtectedRoute = () => {
  return (
    <Route element={<ProtectedLayout />}>
      <Route path={RoutingPath.Dashboard} element={<DashboardPage />} />
      <Route path={RoutingPath.UserSetting} element={<UserSettingPage />} />
      <Route path={RoutingPath.NotFound} element={<DashboardNoFoundPage />} />
    </Route>
  );
};
