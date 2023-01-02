import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { authenticateSaga } from './saga';
import { AuthenticateState } from './types';

export const initialState: AuthenticateState = {
  authenticated: false,
  loading: false,
  status: '',
  token: '',
};

const slice = createSlice({
  name: 'authenticate',
  initialState,
  reducers: {
    login(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
  },
});

export const { actions: authenticateActions, reducer } = slice;

export const useAuthenticateFormSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  useInjectSaga({ key: slice.name, saga: authenticateSaga });
  return { actions: slice.actions };
};
