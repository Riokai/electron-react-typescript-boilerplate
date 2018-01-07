import * as React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import Root from './containers/Root'
import counterSaga from './sagas'
import './app.global.scss'

const {
  configureStore,
  history,
  sagaMiddleware
} = require('./store/configureStore')
const store = configureStore()

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
)

sagaMiddleware.run(counterSaga)

if ((module as any).hot) {
  ;(module as any).hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root').default
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    )
  })
}
