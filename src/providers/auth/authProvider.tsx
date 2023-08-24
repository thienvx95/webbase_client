import { AuthParams } from 'api/auth/models';
import { layoutActions } from 'providers/layout/slice';
import React, { createContext, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CacheKey, StorageUtil } from 'utils/storageUtil';
import { TokenUtil } from 'utils/tokenUtils';
import { useAuthenticateSlice } from './slice';

type AuthContextValue = {
  isAuthenticated: () => boolean;

  login: (data: AuthParams) => void;
  logout: () => void;
  removeLoginError: () => void;
};

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: () => false,
  login: (data: AuthParams) => undefined,
  logout: () => undefined,
  removeLoginError: () => undefined,
});

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { actions } = useAuthenticateSlice();
  const { toggleLoading } = layoutActions;

  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const login = useCallback(data => dispatch(actions.login(data)), []);

  const logout = useCallback(() => {
    StorageUtil.remove(CacheKey.WebApiToken);
    StorageUtil.remove(CacheKey.WebApiRefreshhToken);
    navigate('/', { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const removeLoginError = useCallback(() => {
    dispatch(actions.removeError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isAuthenticated = useCallback(() => {
    var isAuthenticated = TokenUtil.isAuthenticated();
    if (!isAuthenticated) {
      const refreshToken = StorageUtil.get<string>(
        CacheKey.WebApiRefreshhToken,
      );
      if (refreshToken) {
        dispatch(
          actions.refreshToken({
            token: refreshToken,
          }),
        );
      }
      dispatch(toggleLoading(false));
    }
    return isAuthenticated;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      logout,
      login,
      removeLoginError,
    }),
    [isAuthenticated, login, logout, removeLoginError],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
