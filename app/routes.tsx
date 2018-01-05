import * as React from 'react'
import { Switch, Route, Router } from 'dva/router'
import { RouterAPI } from 'dva'
import App from './containers/App'
import HomePage from './containers/HomePage'
import CounterPage from './containers/CounterPage'

export default ({ history }: RouterAPI) => (
  <App>
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/counter" component={CounterPage} />
      </Switch>
    </Router>
  </App>
)
