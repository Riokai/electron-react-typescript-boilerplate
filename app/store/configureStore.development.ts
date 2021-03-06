import { createStore, applyMiddleware, compose } from 'redux';
// import thunk from 'redux-thunk';
import { createHashHistory } from 'history';
import { routerMiddleware, push } from 'react-router-redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers';
import rootSaga from '../sagas';

import * as counterActions from '../actions/counter';

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(a: any): void;
};

declare const module: NodeModule & {
  hot?: {
    accept(...args: any[]): any;
  }
};

const sagaMiddleware = createSagaMiddleware()
const actionCreators = Object.assign({}, 
  counterActions,
  {push}
);

const logger = (<any>createLogger)({
  level: 'info',
  collapsed: true
});

const history = createHashHistory();
const router = routerMiddleware(history);

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers: typeof compose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    actionCreators
  }) as any :
  compose;

/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware, router, process.env.NODE_ENV !== 'test' ? logger : null )
);

export = {
  history,
  configureStore(initialState: Object | void) {
    const store = createStore(rootReducer, initialState, enhancer);
    
    let sagaTask = sagaMiddleware.run(function* () {
      yield rootSaga()
    })

    if (module.hot) {
      module.hot.accept('../reducers', () =>
        store.replaceReducer(require('../reducers').default) // eslint-disable-line global-require
      );

      module.hot.accept('../sagas', () => {
        const newSaga = require('../sagas').default

        sagaTask.cancel()
        sagaTask.done.then(() => {
          sagaTask = sagaMiddleware.run(function* replaceSaga() {
            yield newSaga()
          })
        })
      })
    }

    return store;
  }
};
