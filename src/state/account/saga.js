import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { getAccountUser, getAccountUserFinish } from './reducer';
import { client } from 'utils/request';
import { Endpoint } from 'utils/endpoint'
import { build } from 'utils/query-string'

function* watchGetAccountUser({ payload }) {
  const res = yield call(client.get, `${Endpoint.USER}?${build(payload)}`);
  return yield put(getAccountUserFinish(res))
}


export function* rootSagas() {
  yield all([
    takeEvery(getAccountUser.type, watchGetAccountUser),
  ]);
}
