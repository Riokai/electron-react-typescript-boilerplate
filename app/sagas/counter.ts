// import {  } from 'redux-saga'
import { put, call, takeEvery } from 'redux-saga/effects'
// import { increment } from '../actions/counter'

// 一个工具函数：返回一个 Promise，这个 Promise 将在 1 秒后 resolve
// export const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms))

export function delay (ms: number = 1000): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Our worker Saga: 将异步执行 increment 任务
export function* incrementAsync() {
  yield call(delay, 1000)
  yield put({ type: 'INCREMENT_COUNTER' })
}

// Our watcher Saga: 在每个 INCREMENT_ASYNC action 调用后，派生一个新的 incrementAsync 任务
export default function* watchIncrementAsync() {
  console.log(1111);
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}