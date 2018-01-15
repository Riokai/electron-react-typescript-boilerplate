import { call, put, select } from 'redux-saga/effects'
// import { push } from 'react-router-redux'
import * as sagas from '../../app/sagas/counter'
import * as actions from '../../app/actions/counter'
import { delay } from '../../app/utils'

describe('effects', () => {
  it('incrementAsyncTask', () => {
    const saga = sagas.incrementAsyncTask
    const gen = saga()
    let next = gen.next()

    expect(next.value).toEqual(call(delay, 1000))
    
    next = gen.next()

    expect(next.value).toEqual(put(actions.increment(undefined)))

    next = gen.next()

    expect(next.done).toBe(true);
  });

  it('incrementIfOddTask', () => {
    const saga = sagas.incrementIfOddTask
    const gen = saga()
    let next = gen.next()

    expect(next.value).toEqual(select())
    
    next = gen.next({ count: 1 })
    // expect(next.value).toEqual(put(push('/')))
    
    // next = gen.next()
    expect(next.value).toEqual(put(actions.increment(undefined)))

    next = gen.next()
    expect(next.done).toBe(true);
  });
});