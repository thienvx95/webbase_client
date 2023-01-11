import { PayloadAction } from '@reduxjs/toolkit';
import { AuthResult, RefreshTokenParam } from 'api/auth/models';
import { ResponseResult } from 'api/common/models';
import { UserProfile } from 'api/user/models';
import { UserInformation } from 'api/user/models/userInformation';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { CacheKey, LocalStorageUtil } from 'utils/localStorageUtil';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { TokenUtil } from 'utils/tokenUtils';
import { authenticateSaga } from './saga';
import { AuthenticateState } from './types';

export const initialState: AuthenticateState = {
  error: null,
  token: LocalStorageUtil.get<string>(CacheKey.WebApiToken),
  refreshToken: LocalStorageUtil.get<string>(CacheKey.WebApiRefreshhToken),
  user: TokenUtil.getCurentUserProfile(),
  userInformation: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {},
    authError(state, action: PayloadAction<ResponseResult<boolean>>) {
      state.error = {
        message: action.payload?.message,
        code: action.payload?.code,
        errors: action.payload?.errors,
      };
      state.user = null;
    },
    authSuccess(state, action: PayloadAction<ResponseResult<AuthResult>>) {
      state.error = null;
      state.token = action.payload.data.token ?? '';
      state.refreshToken = action.payload.data.refreshToken ?? '';
      LocalStorageUtil.set(CacheKey.WebApiToken, action.payload.data.token);
      LocalStorageUtil.set(
        CacheKey.WebApiRefreshhToken,
        action.payload.data.refreshToken,
      );
      state.user = TokenUtil.getCurentUserProfile();
    },
    refreshToken(state, action: PayloadAction<RefreshTokenParam>) {},
    refreshError(state) {
      LocalStorageUtil.remove(CacheKey.WebApiToken);
      LocalStorageUtil.remove(CacheKey.WebApiRefreshhToken);
    },
    removeError(state) {
      state.error = null;
    },
    fetchCurrentUser(state) {},
    fetchCurrentUserSuccess(state, action: PayloadAction<UserProfile>) {
      state.user = action.payload;
    },
    fetchUserInformation(state) {},
    fetchUserInformationSuccess(state, action: PayloadAction<UserInformation>) {
      state.userInformation = action.payload;
    },
  },
});

export const { actions: authenticateActions, reducer } = slice;

export const useAuthenticateSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authenticateSaga });
  return { actions: slice.actions };
};
