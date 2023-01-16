import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';
import { themes } from 'providers/layout/themes';
import { loopMenuItem } from '../../../utils/menuLoop';

export const selectTheme = createSelector(
  [(state: RootState) => state.appLayout || initialState],
  appLayout => {
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
