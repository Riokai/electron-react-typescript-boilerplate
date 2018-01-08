import { } from 'redux-saga'
import { put, call, takeEvery, select, all } from 'redux-saga/effects'
// import { push } from 'react-router-redux'
import { delay } from '../utils'
import { increment, incrementAsync, incrementIfOdd } from '../actions/counter'

// Our worker Saga: 将异步执行 increment 任务
export function* incrementAsyncTask() {
  yield call(delay, 1000)
  yield put(increment(undefined))
}

export function* incrementIfOddTask() {
  const { counter } = yield select()

  if (counter % 2 === 0) {
    return;
  } else {
    // yield put(push('/'))
  }

  yield put(increment(undefined))
}

// Our watcher Saga: 在每个 INCREMENT_ASYNC action 调用后，派生一个新的 incrementAsync 任务
export function* watchIncrementAsync() {
  yield takeEvery(incrementAsync.getType(), incrementAsyncTask)
}

export function* watchIncrementIfOdd() {
  yield takeEvery(incrementIfOdd.getType(), incrementIfOddTask)
}

export default function* counterSaga() {
  yield all([ watchIncrementAsync(), watchIncrementIfOdd() ])
}