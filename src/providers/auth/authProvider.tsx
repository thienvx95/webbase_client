import { AuthParams } from 'api/auth/models';
import { UserProfile } from 'api/user/models';
import { layoutActions } from 'providers/layout/slice';
import React, { createContext, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CacheKey, LocalStorageUtil } from 'utils/localStorageUtil';
import { TokenUtil } from 'utils/tokenUtils';
import { useAuthenticateFormSlice } from './slice';
import { selectCurrentUser } from './slice/selectors';

type AuthContextValue = {
  currentUser: UserProfile | null;
  isAuthenticated: () => boolean;
  login: (data: AuthParams) => void;
  logout: () => void;
  removeLoginError: () => void;
};

export const AuthContext = createContext<AuthContextValue>({
  currentUser: null,
  isAuthenticated: () => false,
  login: (data: AuthParams) => undefined,
  logout: () => undefined,
  removeLoginError: () => undefined,
});

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { actions } = useAuthenticateFormSlice();
  const { toggleLoading } = layoutActions;
  const currentUser = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const login = async data => {
    dispatch(actions.login(data));
  };

  const logout = () => {
    LocalStorageUtil.remove(CacheKey.WebApiToken);
    LocalStorageUtil.remove(CacheKey.WebApiRefreshhToken);
    navigate('/', { replace: true });
  };

  const removeLoginError = () => {
    dispatch(actions.removeError());
  };

  const isAuthenticated = () => {
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
  };

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated,
      logout,
      login,
      removeLoginError,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
