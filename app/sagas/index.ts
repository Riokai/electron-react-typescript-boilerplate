import { all } from 'redux-saga/effects'
import counterSagas from './counter'
import systemSagas from './system'

export default function* rootSaga() {
  yield all([
    counterSagas(),
    systemSagas(),
  ])
}

