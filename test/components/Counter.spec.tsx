import '../utils/enzymeConfig'

import { spy } from 'sinon'
import * as React from 'react'
import { shallow } from 'enzyme'
import Counter from '../../app/components/Counter'

const CounterAny = Counter as any

function setup() {
  const actions = {
    dispatch: spy()
  }

  const component = shallow(<CounterAny counter={1} {...actions} />)
  return {
    component,
    actions,
    buttons: component.find('button'),
    p: component.find('.counter')
  }
}

describe('Counter component', () => {
  it('should should display count', () => {
    const { p } = setup()
    expect(p.text()).toMatch(/^1$/)
  })

  it('should first button should call increment', () => {
    const { buttons, actions } = setup()
    buttons.at(0).simulate('click')
    expect(actions.dispatch.called).toBe(true)
  })

  it('should second button should call decrement', () => {
    const { buttons, actions } = setup()
    buttons.at(1).simulate('click')
    expect(actions.dispatch.called).toBe(true)
  })

  xit('should third button should call incrementIfOdd', () => {
    const { buttons, actions } = setup()
    buttons.at(2).simulate('click')
    expect(actions.dispatch.called).toBe(true)
  })

  it('should fourth button should call incrementAsync', () => {
    const { buttons, actions } = setup()
    buttons.at(3).simulate('click')
    expect(actions.dispatch.called).toBe(true)
  })
})
