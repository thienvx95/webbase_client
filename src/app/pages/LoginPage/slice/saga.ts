import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';
import { authenticateActions as actions } from '.';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  yield delay(500);

  const requestURL = ``;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
  } catch (err: any) {}
}

export function* login() {
  yield delay(500);
}

/**
 * Root saga manages watcher lifecycle
 */
export function* authenticateSaga() {
  yield takeLatest(actions.login.type, login);
}
