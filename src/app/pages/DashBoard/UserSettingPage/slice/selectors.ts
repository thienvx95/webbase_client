import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.userSetting || initialState;

export const selectUserSetting = createSelector([selectDomain], state => state);

export const selectCurrentUser = createSelector(
  [selectDomain],
  state => state.user,
);

export const selectUserIpLookup = createSelector(
  [selectDomain],
  state => state.userIpLookup,
);

export const selectCurrentUserLoginActivity = createSelector(
  [selectDomain],
  state => state.userLoginActivity,
);
