import decode, { JwtPayload } from 'jwt-decode';
import isEmpty from 'lodash/isEmpty';
import React, { createContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  DashboardPath,
  WebApiToken,
  WebApiRefreshhToken,
} from 'utils/constants';
import { useBrowserStorage } from 'hooks/useBrowserStorage';

type AuthContextValue = {
  token: string;
  refreshToken: string;
  isAuthenticated: () => boolean;
};

export const AuthContext = createContext<AuthContextValue>({
  token: '',
  refreshToken: '',
  isAuthenticated: () => false,
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useBrowserStorage(WebApiToken, '');
  const [refreshToken, setRefreshToken] = useBrowserStorage(
    WebApiRefreshhToken,
    '',
  );
  const navigate = useNavigate();

  // const login = async data => {
  //   setApiToken(data);
  //   navigate(DashboardPath, { replace: true });
  // };

  // const logout = () => {
  //   setApiToken(null);
  //   navigate('/', { replace: true });
  // };

  const isAuthenticated = () => {
    if (isEmpty(token) || isEmpty(refreshToken)) return false;

    try {
      const { exp } = decode(token) as JwtPayload;
      if (exp != null && Date.now() / 1000 > exp) {
        return false;
      }
    } catch (err) {
      return false;
    }
    return true;
  };

  const value = useMemo(
    () => ({
      token: token,
      refreshToken: refreshToken,
      isAuthenticated,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [token, refreshToken],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
