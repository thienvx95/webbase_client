import { PayloadAction } from '@reduxjs/toolkit';
import { ResponseResult } from 'api/common/models';
import { ChangePasswordParams, UserDetail } from 'api/user/models';
import { UserInformation } from 'api/user/models/userInformation';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { authenticateSaga } from './saga';
import { UserSettingState } from './types';

export const initialState: UserSettingState = {
  user: null,
  userInformation: null,
};

const slice = createSlice({
  name: 'userSetting',
  initialState,
  reducers: {
    fetchCurrentUser(state) {},
    fetchCurrentUserSuccess(
      state,
      action: PayloadAction<ResponseResult<UserDetail>>,
    ) {
      state.user = action.payload.data;
    },
    fetchUserInformation(state) {},
    fetchUserInformationSuccess(state, action: PayloadAction<UserInformation>) {
      state.userInformation = action.payload;
    },
    updateCurrentUser(state, action: PayloadAction<UserDetail>) {},
    changePassword(state, action: PayloadAction<ChangePasswordParams>) {},
  },
});

export const { actions: userSettingActions, reducer } = slice;

export const useUserSettingSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authenticateSaga });
  return { actions: slice.actions };
};
