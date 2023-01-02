import React from 'react';
import { useAuth } from 'hooks/useAuth';
import { Navigate, useOutlet } from 'react-router-dom';
import { DashboardPath } from 'utils/constants';

export const HomeLayout = () => {
  const { isAuthenticated } = useAuth();
  const outlet = useOutlet();

  if (isAuthenticated()) {
    return <Navigate to={DashboardPath} replace />;
  }

  return <>{outlet}</>;
};
