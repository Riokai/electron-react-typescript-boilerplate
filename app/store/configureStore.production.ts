import { createStore, applyMiddleware } from 'redux';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga'
import rootReducer from '../reducers';
import rootSaga from '../sagas';

const sagaMiddleware = createSagaMiddleware()
const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(sagaMiddleware, router);

export = {
  history,
  configureStore(initialState: Object | void) {
    const store = createStore(rootReducer, initialState, enhancer);

    sagaMiddleware.run(rootSaga)
    
    return store
  }
};
