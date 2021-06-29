import { all, takeEvery, put, call, fork } from 'redux-saga/effects';
import { uploadBanner, uploadBannerFinish, getBanner, getBannerFinish, updateBanner, updateBannerFinish, deleteBanner } from './reducer';
import { client } from 'utils/request';
import { Endpoint } from 'utils/endpoint'
import { build } from 'utils/query-string'
function* watchUploadBanner({ payload }) {
  const { pictures, filterConditions } = payload
  const formData = new FormData();
  for (const file of pictures) {
    formData.append('images[]', file);
  }
  const res = yield call(client.post, Endpoint.BANNER, formData);
  yield put(uploadBannerFinish(res))
  return yield fork(() => watchGetBanner({ payload: filterConditions }))
}
function* watchGetBanner({ payload }) {
  const res = yield call(client.get, `${Endpoint.BANNER}?${build(payload)}`);
  return yield put(getBannerFinish(res))
}
function* watchUpdateBanner({ payload }) {
  const res = yield call(client.put, `${Endpoint.BANNER}/${payload.bannerId}`, { is_active: payload.checked, order: payload.order });
  yield put(updateBannerFinish(res))
  return yield fork(() => watchGetBanner({ payload: payload.filterConditions }))
}
function* watchDeleteBanner({ payload }) {
  const res = yield call(client.delete, `${Endpoint.BANNER}/${payload.bannerId}`);
  yield put(updateBannerFinish(res))
  return yield fork(() => watchGetBanner({ payload: payload.filterConditions }))
}


export function* rootSagas() {
  yield all([
    takeEvery(uploadBanner.type, watchUploadBanner),
    takeEvery(getBanner.type, watchGetBanner),
    takeEvery(updateBanner.type, watchUpdateBanner),
    takeEvery(deleteBanner.type, watchDeleteBanner),
  ]);
}
