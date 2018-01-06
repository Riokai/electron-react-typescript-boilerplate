import { Model } from 'dva'
import { delay } from '../utils'

const model: Model = {
  namespace: 'count',
  state: 0,
  reducers: {
    add(state: number): number {
      return state + 1
    },
    minus(state: number): number {
      return state - 1
    }
  },
  effects: {
    *addDelay(action, { call, put }) {
      yield call(delay)
      yield put({ type: 'add' })
    }
  }
}

export default model;

export interface IState {
  count: number
}
