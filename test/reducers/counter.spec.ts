import reducer from '../../app/reducers/counter'
import * as actions from '../../app/actions/counter'

describe('reducers', () => {
  it('add', () => {
    const state = 0;

    expect(reducer(state, actions.increment(undefined))).toEqual(1);
  });

  it('minus', () => {
    const state = 0;

    expect(reducer(state, actions.decrement())).toEqual(-1);
  });
});

 