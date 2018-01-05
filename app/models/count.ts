import { Model } from 'dva'
// import { routerRedux } from 'dva/router'

export const delay = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout))

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
      yield call(delay, 1000)
      yield put({ type: 'add' })
    }
  }
}

export default model;

export interface IState {
  count: number
}
