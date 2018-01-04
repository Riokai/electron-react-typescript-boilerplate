import * as React from 'react'
import { Switch, Route } from 'dva/router'
import App from './containers/App'
import HomePage from './containers/HomePage'
import CounterPage from './containers/CounterPage'

export default () => (
  <App>
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/counter" component={CounterPage} />
    </Switch>
  </App>
)
