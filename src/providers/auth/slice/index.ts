import { PayloadAction } from '@reduxjs/toolkit';
import { AuthResult, RefreshTokenParam } from 'api/auth/models';
import { ResponseResult } from 'api/common/models';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { CacheKey, StorageUtil } from 'utils/storageUtil';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { authenticateSaga } from './saga';
import { AuthenticateState } from './types';

export const initialState: AuthenticateState = {
  error: null,
  token: StorageUtil.get<string>(CacheKey.WebApiToken),
  refreshToken: StorageUtil.get<string>(CacheKey.WebApiRefreshhToken),
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
    },
    authSuccess(state, action: PayloadAction<ResponseResult<AuthResult>>) {
      state.error = null;
      state.token = action.payload.data.token ?? '';
      state.refreshToken = action.payload.data.refreshToken ?? '';
      StorageUtil.set(
        CacheKey.WebApiToken,
        action.payload.data.token,
        action.payload.data.remmember,
      );
      StorageUtil.set(
        CacheKey.WebApiRefreshhToken,
        action.payload.data.refreshToken,
        action.payload.data.remmember,
      );
    },
    refreshToken(state, action: PayloadAction<RefreshTokenParam>) {},
    refreshError(state) {
      StorageUtil.remove(CacheKey.WebApiToken);
      StorageUtil.remove(CacheKey.WebApiRefreshhToken);
    },
    removeError(state) {
      state.error = null;
    },
  },
});

export const { actions: authenticateActions, reducer } = slice;

export const useAuthenticateSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authenticateSaga });
  return { actions: slice.actions };
};
