import { createAction } from 'redux-act'

export const increment = createAction('+1', (payload?: number) => payload)
export const decrement = createAction('-1')
export const incrementAsync = createAction('异步')
export const incrementIfOdd = createAction('奇数')

