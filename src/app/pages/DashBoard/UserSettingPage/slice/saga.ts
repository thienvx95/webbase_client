import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { userSettingActions as actions } from '.';
import { ErrorCode } from 'utils/constants';
import { UserAPI } from 'api/user/userApi';
import { UserDetail } from 'api/user/models';
import { layoutActions } from 'providers/layout/slice';
import { Notification } from 'app/components/Notification';

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

/**
 * Root saga manages watcher lifecycle
 */
export function* authenticateSaga() {
  yield takeLatest(actions.fetchCurrentUser.type, fetchCurrentUserSaga);
  yield takeLatest(actions.fetchUserInformation.type, fetchUserInformationSaga);
  yield takeLatest(actions.updateCurrentUser.type, updateCurentUserSaga);
}
