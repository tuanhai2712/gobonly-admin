import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { createCategories, createCategoriesFinish } from './reducer';
import { client } from 'utils/request';
import { Endpoint } from 'utils/endpoint'
import { build } from 'utils/query-string'
function* watchCreateCategories({ payload }) {
  const res = yield call(client.authPost, Endpoint.CATEGORIES, payload);
  // yield put(createCategoriesFinish(res))
}



export function* rootSagas() {
  yield all([
    takeEvery(createCategories.type, watchCreateCategories),
  ]);
}
