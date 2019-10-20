import { all, fork } from 'redux-saga/effects';
import { watchGetDataStart } from './crimes/sagas';
import { watchAuthenticationSaga } from './user/sagas';

export default function* rootSaga() {
  yield all([fork(watchGetDataStart), fork(watchAuthenticationSaga)]);
}
