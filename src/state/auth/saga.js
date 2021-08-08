import { all, takeEvery, put, call, select, fork } from 'redux-saga/effects';
import { signIn, signInFinish } from './reducer';
import { client } from 'utils/request';
import { Endpoint } from 'utils/endpoint'
import { TOKEN, STORAGE_PROFILE } from 'utils/constants'
import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
function* checkAuthenticated() {
  const token = localStorage.getItem(TOKEN);
  const profile = localStorage.getItem(STORAGE_PROFILE);
  if (token) {
    return yield put(signInFinish({ user: JSON.parse(profile) }))
  }
}

function* watchSignIn({ payload }) {
  const res = yield call(client.authPost, Endpoint.LOGIN, payload);
  if (res.data.access_token) {
    localStorage.setItem(TOKEN, res.data.access_token)
    localStorage.setItem(STORAGE_PROFILE, JSON.stringify(res.data.user))
    history.push('/home')
    window.location.reload();
  }
  return yield put(signInFinish(res.data))
}


export function* rootSagas() {
  yield all([
    fork(() => checkAuthenticated()),
    takeEvery(signIn.type, watchSignIn),
  ]);
}
