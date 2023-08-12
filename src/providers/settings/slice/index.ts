import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { settingSaga } from './saga';
import { SettingState } from './types';
import { BaseSettingPage } from 'api/setting/models/baseSettingPage';
import { PageSettingEnum } from 'api/setting/models/pageSettingEnum';

export const initialState: SettingState = {
  login: null,
};

const slice = createSlice({
  name: 'pageSettings',
  initialState,
  reducers: {
    fetchSetting(state, action: PayloadAction<PageSettingEnum>) {},
    fetchSettingSuccess(state, action: PayloadAction<BaseSettingPage>) {
      state[action.payload.type.toLowerCase()] = action.payload;
    },
  },
});

export const { actions: settingActions, reducer } = slice;

export const useSettingSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: settingSaga });
  return { actions: slice.actions };
};
