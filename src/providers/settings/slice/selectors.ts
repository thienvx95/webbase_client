import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.pageSettings || initialState;

export const selectAuthenticate = createSelector(
  [selectDomain],
  state => state,
);

export const selectLoginSettings = createSelector(
  [selectDomain],
  state => state.login,
);
