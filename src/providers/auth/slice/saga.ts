import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { authenticateActions as actions } from '.';

export function* login() {
  yield delay(500);

  const requestURL = ``;

  try {
    const repos = yield call(request, requestURL);
  } catch (err: any) {}
}

/**
 * Root saga manages watcher lifecycle
 */
export function* authenticateSaga() {
  yield takeLatest(actions.login.type, login);
}
