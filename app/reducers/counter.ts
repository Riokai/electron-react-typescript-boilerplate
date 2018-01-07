import { createReducer } from 'redux-act'
import { increment, decrement } from '../actions/counter';

export type TState = number;

// const reducer = createReducer({}, 0)

// reducer.on(increment, (state: TState): TState => {
//   return state + 1
// })

// reducer.on(decrement, (state: TState): TState => {
//   return state - 1
// })

// export default reducer

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