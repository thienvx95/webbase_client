import { createSelector } from '@reduxjs/toolkit';

import { RootState } from 'types';
import { initialState } from '.';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.authenticate || initialState;

export const selectAuthenticate = createSelector(
  [selectDomain],
  state => state,
);

export const selectLoading = createSelector(
  [selectDomain],
  state => state.loading,
);

export const selectStatus = createSelector(
  [selectDomain],
  state => state.status,
);
