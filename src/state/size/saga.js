import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import {
  createSize,
  createSizeFinish,
  getSize,
  getSizeFinish,
} from './reducer';
import { client } from 'utils/request';
import { Endpoint } from 'utils/endpoint';
function* watchCreateSize({ payload }) {
  const res = yield call(client.authPost, Endpoint.SIZE, payload);
  yield put(createSizeFinish(res));
  return yield fork(() => watchGetSize());
}
function* watchGetSize() {
  const res = yield call(client.get, Endpoint.SIZE);
  yield put(getSizeFinish(res));
}

export function* rootSagas() {
  yield all([
    takeEvery(createSize.type, watchCreateSize),
    takeEvery(getSize.type, watchGetSize),
  ]);
}
