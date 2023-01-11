import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.auth || initialState;

export const selectAuthenticate = createSelector(
  [selectDomain],
  state => state,
);

export const selectError = createSelector([selectDomain], state => state.error);

export const selectCurrentUser = createSelector(
  [selectDomain],
  state => state.user,
);

export const selectUserInformation = createSelector(
  [selectDomain],
  state => state.userInformation,
);
