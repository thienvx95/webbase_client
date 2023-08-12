import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { ThemeKeyType, AppLayoutState } from 'providers/layout/slice/types';
import { ProSettings } from '@ant-design/pro-layout';
import { ResponseResult } from 'api/common/models';
import { MenuResult } from 'api/common/models/menuResult';
import { layoutSaga } from './saga';
import { CacheKey, StorageUtil } from 'utils/storageUtil';

export const initialState: AppLayoutState = {
  theme: StorageUtil.get<ThemeKeyType>(CacheKey.Theme) ?? 'light',
  loading: false,
  settings:
    StorageUtil.get<ThemeKeyType>(CacheKey.Theme) === 'dark'
      ? {
          colorPrimary: '#1677FF',
          contentWidth: 'Fluid',
          fixSiderbar: true,
          fixedHeader: false,
          layout: 'side',
          navTheme: 'realDark',
          splitMenus: false,
        }
      : {
          colorPrimary: '#1677FF',
          contentWidth: 'Fluid',
          fixSiderbar: true,
          fixedHeader: false,
          layout: 'side',
          navTheme: 'light',
          splitMenus: false,
        },
  menus: [],
};

const slice = createSlice({
  name: 'appLayout',
  initialState,
  reducers: {
    changeTheme(state, action: PayloadAction<ThemeKeyType>) {
      state.theme = action.payload;
    },
    toggleLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    updateSettings(state, action: PayloadAction<Partial<ProSettings>>) {
      state.settings = action.payload;
      if (action.payload.navTheme === 'realDark') {
        state.theme = 'dark';
      }
      if (action.payload.navTheme === 'light') {
        state.theme = 'light';
      }
    },
    fetchMenu(state, action: PayloadAction) {},
    fetchMenuSuccess(
      state,
      action: PayloadAction<ResponseResult<MenuResult[]>>,
    ) {
      state.menus = action.payload.data;
    },
    fetchError(state, action: PayloadAction) {},
  },
});

export const { actions: layoutActions, reducer } = slice;

export const useThemeSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: layoutSaga });
  return { actions: slice.actions };
};
