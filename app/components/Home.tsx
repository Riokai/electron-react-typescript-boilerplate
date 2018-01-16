import * as React from 'react'
// import { Link } from 'react-router-dom'
// import request from '../utils/request'

let styles = require('./Home.scss')

export interface Props {
  replacePath(path: string): void
}

export class Home extends React.Component<Props> {
  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Home</h2>
          {/* <Link to="/counter">to Counter</Link> */}
          <a
            onClick={() => {
              this.props.replacePath('/counter')
              // request({
              //   url: 'https://www.baidu.com'
              // }).then(res => {
              //   console.log('res', res)
              // })
            }}
          >
            to Counter
          </a>
        </div>
      </div>
    )
  }
}
