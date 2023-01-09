import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { layoutActions as actions } from '.';
import { CommonAPI } from 'api/common/commonApi';
import { Notification } from 'app/components/Notification';
import { ErrorCode } from 'utils/constants';

export function* fetchMenuSaga(data: PayloadAction) {
  yield delay(500);
  try {
    const result = yield call(CommonAPI.fetchMenu);
    if (result.success) {
      yield put(actions.fetchMenuSuccess(result));
    }
  } catch (err: any) {
    Notification.error(ErrorCode.UnknownError);
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* layoutSaga() {
  yield takeLatest(actions.fetchMenu.type, fetchMenuSaga);
}
