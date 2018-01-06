import { effects } from 'dva/saga'
import count from '../../app/models/count'
import { delay } from '../../app/utils'

const { put, call } = effects;

describe('Count Model', () => {
  it('loads', () => {
    expect(count).toBeDefined()
  })

  describe('reducers', () => {
    const reducers = count.reducers;

    it('add', () => {
      const reducer = reducers.add;
      const state = 0;

      expect(reducer(state, { type: '' })).toEqual(1);
    });

    it('minus', () => {
      const reducer = reducers.minus;
      const state = 0;

      expect(reducer(state, { type: '' })).toEqual(-1);
    });
  });

  describe('effects', () => {
    const sagas = count.effects

    it('addDelay', () => {
      const saga = sagas.addDelay
      const gen = saga({ type: 'count/addDelay' }, effects)
      let next = gen.next()

      expect(next.value).toEqual(call(delay))
      
      next = gen.next()

      expect(next.value).toEqual(put({ type: 'add' }))

      next = gen.next()

      expect(next.done).toBe(true);
    });
  });
})