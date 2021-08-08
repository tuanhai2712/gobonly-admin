import { all, takeEvery, put, call } from 'redux-saga/effects';
import {
  createCategories,
  createCategoriesFinish,
  getCategories,
  getCategoriesFinish,
  updateCategory,
  updateCategoryFinish,
} from './reducer';
import { client } from 'utils/request';
import { Endpoint } from 'utils/endpoint';
function* watchCreateCategories({ payload }) {
  const res = yield call(client.authPost, Endpoint.CATEGORIES, payload);
  yield put(createCategoriesFinish(res));
}
function* watchGetCategories() {
  const res = yield call(client.get, Endpoint.CATEGORIES);
  yield put(getCategoriesFinish(res));
}
function* watchUpdateCategory({ payload }) {
  const res = yield call(client.authPost, Endpoint.UPDATE_CATEGORY, payload);
  yield put(updateCategoryFinish(res));
}

export function* rootSagas() {
  yield all([
    takeEvery(createCategories.type, watchCreateCategories),
    takeEvery(getCategories.type, watchGetCategories),
    takeEvery(updateCategory.type, watchUpdateCategory),
  ]);
}
