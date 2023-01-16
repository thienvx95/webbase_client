import { AuthParams } from 'api/auth/models';
import { UserDetail } from 'api/user/models/userDetail';
import { layoutActions } from 'providers/layout/slice';
import React, { createContext, useMemo, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CacheKey, LocalStorageUtil } from 'utils/localStorageUtil';
import { TokenUtil } from 'utils/tokenUtils';
import { useAuthenticateSlice } from './slice';

type AuthContextValue = {
  isAuthenticated: () => boolean;
  login: (data: AuthParams) => void;
  logout: () => void;
  removeLoginError: () => void;
  updateCurrentUser: (user: UserDetail) => void;
};

export const AuthContext = createContext<AuthContextValue>({
  isAuthenticated: () => false,
  login: (data: AuthParams) => undefined,
  logout: () => undefined,
  removeLoginError: () => undefined,
  updateCurrentUser: (user: UserDetail) => undefined,
});

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { actions } = useAuthenticateSlice();
  const { toggleLoading } = layoutActions;

  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const login = useCallback(data => dispatch(actions.login(data)), []);

  const logout = useCallback(() => {
    LocalStorageUtil.remove(CacheKey.WebApiToken);
    LocalStorageUtil.remove(CacheKey.WebApiRefreshhToken);
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
      const refreshToken = LocalStorageUtil.get<string>(
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

  const updateCurrentUser = useCallback((user: UserDetail) => {
    dispatch(actions.updateCurrentUser(user));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({
      isAuthenticated,
      logout,
      login,
      removeLoginError,
      updateCurrentUser,
    }),
    [isAuthenticated, login, logout, removeLoginError, updateCurrentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
