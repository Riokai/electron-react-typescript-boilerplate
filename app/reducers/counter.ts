import { createReducer } from 'redux-act'
import { increment, decrement } from '../actions/counter';

export type TState = number;

export default createReducer({
  [increment.getType()]: (state: number, payload?: number) => {
    let offset = 1;

    if (payload) {
      offset = payload
    }

    return state + offset
  },
  [decrement.getType()]: (state: number) => {
    return state - 1
  }
}, 0)