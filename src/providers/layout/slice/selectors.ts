import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';
import { themes } from 'providers/layout/themes';
import { isSystemDark } from 'providers/layout/utils';
import { loopMenuItem } from './menuLoop';

export const selectTheme = createSelector(
  [(state: RootState) => state.appLayout || initialState],
  appLayout => {
    if (appLayout.theme === 'system') {
      return isSystemDark ? themes.dark : themes.light;
    }
    return themes[appLayout.theme];
  },
);

export const selectThemeKey = createSelector(
  [(state: RootState) => state.appLayout || initialState],
  appLayout => appLayout.theme,
);

export const selectLoading = createSelector(
  [(state: RootState) => state.appLayout || initialState],
  appLayout => appLayout.loading,
);

export const selectDashboardSettings = createSelector(
  [(state: RootState) => state.appLayout || initialState],
  appLayout => appLayout.settings,
);

export const selectMenus = createSelector(
  [(state: RootState) => state.appLayout || initialState],
  appLayout => loopMenuItem(appLayout.menus),
);
