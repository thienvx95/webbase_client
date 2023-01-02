import { useAuth } from 'hooks/useAuth';
import React from 'react';
import { Navigate, useOutlet } from 'react-router-dom';
import { LoginPath } from 'utils/constants';

export const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();
  const outlet = useOutlet();

  if (!isAuthenticated()) {
    return <Navigate to={LoginPath} />;
  }

  return <>{outlet}</>;
};
