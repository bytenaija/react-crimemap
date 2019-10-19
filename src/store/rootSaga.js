import { all, fork } from 'redux-saga/effects'
import { watchGetDataStart } from './crimes/sagas'



export default function* rootSaga(){
  yield all([fork(watchGetDataStart)])
}
