import { put, call, takeEvery, select, all, takeLatest } from 'redux-saga/effects'
import { delay } from '../utils'
import { increment, incrementAsync, incrementIfOdd } from '../actions/counter'
import { Action } from 'redux-act'

// Our worker Saga: 将异步执行 increment 任务
export function* incrementAsyncTask(action: Action<number>) {
  yield call(delay, 1000)
  yield put(increment(action.payload))
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
  yield takeLatest(incrementAsync.getType(), incrementAsyncTask)
}

export function* watchIncrementIfOdd() {
  yield takeEvery(incrementIfOdd.getType(), incrementIfOddTask)
}

export default function* counterSaga() {
  yield all([ watchIncrementAsync(), watchIncrementIfOdd() ])
}