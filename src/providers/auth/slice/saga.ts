import { PayloadAction } from '@reduxjs/toolkit';
import { AuthAPI } from 'api/auth/authApi';
import { AuthParams } from 'api/auth/models';
import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { authenticateActions as actions } from '.';
import { RoutingPath } from 'utils/constants';
import { globalNavigate } from 'app';

export function* loginSaga(data: PayloadAction<AuthParams>) {
  yield delay(500);
  try {
    const result = yield call(AuthAPI.login, data.payload);
    if (result.success) {
      yield put(actions.authSuccess(result));
      globalNavigate(RoutingPath.Dashboard);
    } else {
      yield put(actions.authError(result));
    }
  } catch (err: any) {
    yield put(actions.authError(err));
  }
}

export function* refreshTokenSaga(data: PayloadAction<string>) {
  yield delay(500);
  try {
    const result = yield call(AuthAPI.refreshToken, data.payload);
    if (result.success) {
      yield put(actions.authSuccess(result));
      globalNavigate(RoutingPath.Dashboard);
    }
    yield put(actions.refreshError());
  } catch (err: any) {
    yield put(actions.refreshError());
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* authenticateSaga() {
  yield takeLatest(actions.login.type, loginSaga);
  yield takeLatest(actions.refreshToken.type, refreshTokenSaga);
}
