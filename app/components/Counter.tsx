import * as React from 'react'
import { Action } from 'redux'

const styles = require('./Counter.scss')

export interface Props {
  dispatch(action: Action): void
  counter: number
}

export class Counter extends React.Component<Props> {
  render() {
    const { counter, dispatch } = this.props

    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <a>
            <i className="fa fa-arrow-left fa-3x" />
          </a>
        </div>
        <div className={`counter ${styles.counter}`} data-tid="counter">
          {counter}
        </div>
        <div className={styles.btnGroup}>
          <button
            className={styles.btn}
            onClick={() => {
              dispatch({ type: 'count/add' })
            }}
            data-tclass="btn"
          >
            <i className="fa fa-plus" />
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              dispatch({ type: 'count/minus' })
            }}
            data-tclass="btn"
          >
            <i className="fa fa-minus" />
          </button>
          <button
            className={styles.btn}
            // onClick={incrementIfOdd}
            data-tclass="btn"
          >
            odd
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              dispatch({ type: 'count/addDelay' })
            }}
            data-tclass="btn"
          >
            async
          </button>
        </div>
      </div>
    )
  }
}

export default Counter
