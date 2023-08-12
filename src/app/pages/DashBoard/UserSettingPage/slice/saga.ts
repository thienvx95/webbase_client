import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { userSettingActions as actions } from '.';
import { ErrorCode, RoutingPath } from 'utils/constants';
import { ChangePasswordParams, UserDetail } from 'api/user/models';
import { layoutActions } from 'providers/layout/slice';
import { Notification } from 'app/components/Notification';
import { CacheKey, StorageUtil } from 'utils/storageUtil';
import { globalNavigate } from 'app';
import { PaginateParams } from 'api/common/models/paginateParams';
import { UserProfileAPI } from 'api/user/userProfileApi';

export function* fetchCurrentUserSaga() {
  yield delay(500);
  try {
    const result = yield call(UserProfileAPI.getUserProfile);
    if (result.success) {
      yield put(actions.fetchCurrentUserSuccess(result));
    }
  } catch (err: any) {
    Notification.error(ErrorCode.UnknownError);
  }
}

export function* fetchUserIpLookupSaga() {
  yield delay(500);
  try {
    const result = yield call(UserProfileAPI.getCurrentIpLookup);
    yield put(actions.fetchUserIpLookupSuccess(result));
    return;
  } catch (err: any) {
    Notification.error(ErrorCode.UnknownError);
  }
}

export function* fetchCurrentUserLoginActivitiesSaga(
  data: PayloadAction<PaginateParams>,
) {
  yield delay(500);
  try {
    const result = yield call(
      UserProfileAPI.getCurrentUserLoginActivities,
      data.payload,
    );
    yield put(actions.fetchCurrentUserLoginActivitiesSuccess(result));
    return;
  } catch (err: any) {
    Notification.error(ErrorCode.UnknownError);
  }
}

export function* updateCurentUserSaga(data: PayloadAction<UserDetail>) {
  yield put(layoutActions.toggleLoading(true));
  yield delay(500);
  try {
    const result = yield call(UserProfileAPI.updateUserProfile, data.payload);
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

export function* changePasswordSaga(data: PayloadAction<ChangePasswordParams>) {
  yield put(layoutActions.toggleLoading(true));
  yield delay(500);
  try {
    const result = yield call(UserProfileAPI.changePassword, data.payload);
    if (result.success) {
      yield put(actions.fetchCurrentUser());
      StorageUtil.remove(CacheKey.WebApiRefreshhToken);
      StorageUtil.remove(CacheKey.WebApiToken);
      Notification.success('changePassword');
      globalNavigate(RoutingPath.Login, { replace: true });
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
  yield takeLatest(actions.fetchUserIpLookup.type, fetchUserIpLookupSaga);
  yield takeLatest(actions.updateCurrentUser.type, updateCurentUserSaga);
  yield takeLatest(actions.changePassword.type, changePasswordSaga);
  yield takeLatest(
    actions.fetchCurrentUserLoginActivities.type,
    fetchCurrentUserLoginActivitiesSaga,
  );
}
