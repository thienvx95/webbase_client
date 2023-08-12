import React, { createContext, useCallback, useMemo } from 'react';
import { settingActions, useSettingSlice } from './slice';
import { PageSettingEnum } from 'api/setting/models/pageSettingEnum';
import { BaseSettingPage } from 'api/setting/models/baseSettingPage';
import { useDispatch } from 'react-redux';

type SettingContextValue = {
  fetchPageSetting: (page: PageSettingEnum) => BaseSettingPage | null;
};

export const SettingContext = createContext<SettingContextValue>({
  fetchPageSetting: () => null,
});

export const SettingProvider = ({ children }) => {
  const dispatch = useDispatch();
  useSettingSlice();

  const fetchPageSetting = useCallback(
    (page: PageSettingEnum) => dispatch(settingActions.fetchSetting(page)),
    [],
  );

  const value = useMemo(
    () => ({
      fetchPageSetting,
    }),
    [fetchPageSetting],
  );
  return (
    <SettingContext.Provider value={value}>{children}</SettingContext.Provider>
  );
};
