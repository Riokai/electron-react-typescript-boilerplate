import * as React from 'react'
import { Link } from 'react-router-dom'

let styles = require('./Counter.scss')
let num = 1

export interface Props {
  increment(): void
  incrementIfOdd(): void
  incrementAsync(number: number): void
  decrement(): void
  counter: number
}

export class Counter extends React.Component<Props> {
  render() {
    const {
      increment,
      incrementIfOdd,
      incrementAsync,
      decrement,
      counter
    } = this.props

    return (
      <div>
        <div className={styles.backButton} data-tid="backButton">
          <Link to="/">
            <i className="fa fa-arrow-left fa-3x" />
          </Link>
        </div>
        <div className={`counter ${styles.counter}`} data-tid="counter">
          {counter}
        </div>
        <div className={styles.btnGroup}>
          <button
            className={styles.btn}
            onClick={() => {
              increment()
            }}
            data-tclass="btn"
          >
            <i className="fa fa-plus" />
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              decrement()
            }}
            data-tclass="btn"
          >
            <i className="fa fa-minus" />
          </button>
          <button
            className={styles.btn}
            onClick={() => {
              incrementIfOdd()
            }}
            data-tclass="btn"
          >
            odd
          </button>
          <button
            className={styles.btn}
            onClick={() => incrementAsync(num++)}
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
