import { take, put, all } from 'redux-saga/effects'
import { replace } from 'react-router-redux'
import { replacePath } from '../actions/system'

export function* replacePathTask() {
  while (1) {
    const { payload } = yield take(replacePath.getType())
    yield put(replace(payload))
  }
}

export default function* systemSagas() {
  yield all([ replacePathTask ])
}
