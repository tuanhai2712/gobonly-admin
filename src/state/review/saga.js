import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { getReview, getReviewFinish } from './reducer';
import { client } from 'utils/request';
import { Endpoint } from 'utils/endpoint'
import { build } from 'utils/query-string'

function* watchGetReview({ payload }) {
  const res = yield call(client.get, `${Endpoint.REVIEW}?${build(payload)}`);
  return yield put(getReviewFinish(res))
}


export function* rootSagas() {
  yield all([
    takeEvery(getReview.type, watchGetReview),
  ]);
}
