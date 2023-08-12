import { PayloadAction } from '@reduxjs/toolkit';
import { call, put, takeLatest, delay } from 'redux-saga/effects';
import { settingActions as actions } from '.';
import { BaseSettingPage } from 'api/setting/models/baseSettingPage';
import { ResponseResult } from 'api/common/models';
import { PageSettingEnum } from 'api/setting/models/pageSettingEnum';
import { SettingPageAPI } from 'api/setting/settingApi';

export function* fetchSetting(data: PayloadAction<PageSettingEnum>) {
  yield delay(500);
  try {
    const result: ResponseResult<BaseSettingPage> = yield call(
      SettingPageAPI.getSettingPage,
      data.payload,
    );
    if (result.success) {
      yield put(actions.fetchSettingSuccess(result.data));
    }
  } catch (err: any) {}
}

/**
 * Root saga manages watcher lifecycle
 */
export function* settingSaga() {
  yield takeLatest(actions.fetchSetting.type, fetchSetting);
}
