import { PayloadAction } from '@reduxjs/toolkit';
import { AuthAPI } from 'api/auth/authApi';
import { AuthParams } from 'api/auth/models';
import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { authenticateActions as actions } from '.';
import { ErrorCode, RoutingPath } from 'utils/constants';
import { globalNavigate } from 'app';
import { UserAPI } from 'api/user/userApi';
import { UserDetail } from 'api/user/models';
import { layoutActions } from 'providers/layout/slice';
import { Notification } from 'app/components/Notification';

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

export function* fetchCurrentUserSaga() {
  yield delay(500);
  try {
    const result = yield call(UserAPI.getUserProfile);
    if (result.success) {
      yield put(actions.fetchCurrentUserSuccess(result));
    }
  } catch (err: any) {
    Notification.error(ErrorCode.UnknownError);
  }
}

export function* fetchUserInformationSaga() {
  yield delay(500);
  try {
    const result = yield call(UserAPI.getCurrentIpLookup);
    if (result.success) {
      yield put(actions.fetchUserInformationSuccess(result));
      return;
    }
  } catch (err: any) {
    Notification.error(ErrorCode.UnknownError);
  }
}

export function* updateCurentUserSaga(data: PayloadAction<UserDetail>) {
  yield put(layoutActions.toggleLoading(true));
  yield delay(500);
  try {
    const result = yield call(UserAPI.updateUserProfile, data.payload);
    if (result.success) {
      yield put(actions.fetchCurrentUser());
      Notification.success('update');
      return;
    } else {
      Notification.error(result?.code);
    }
  } catch (err: any) {
    Notification.error(ErrorCode.UnknownError);
  } finally {
    yield put(layoutActions.toggleLoading(false));
  }
}

export function* uploadAvatarSaga(data: PayloadAction<File[]>) {
  yield put(layoutActions.toggleLoading(true));
  yield delay(500);
  try {
    const result = yield call(UserAPI.uploadAvatar, data.payload);
    if (result.success) {
      yield put(actions.fetchCurrentUser());
      Notification.success('update');
      return;
    } else {
      Notification.error(result?.code);
    }
  } catch (err: any) {
    Notification.error(ErrorCode.UnknownError);
  } finally {
    yield put(layoutActions.toggleLoading(false));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* authenticateSaga() {
  yield takeLatest(actions.login.type, loginSaga);
  yield takeLatest(actions.refreshToken.type, refreshTokenSaga);
  yield takeLatest(actions.fetchCurrentUser.type, fetchCurrentUserSaga);
  yield takeLatest(actions.fetchUserInformation.type, fetchUserInformationSaga);
  yield takeLatest(actions.updateCurrentUser.type, updateCurentUserSaga);
  yield takeLatest(actions.uploadAvatar.type, uploadAvatarSaga);
}
