import config from 'config';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';

const reducers = require('../reducers');
const sagas = require('../sagas');

const loggerMiddleware = createLogger({
  predicate: () => config.appEnv === 'dev'
});

const sagaMiddleware = createSagaMiddleware();

export default function (initialState) {
  const store = createStore(reducers, applyMiddleware(
    sagaMiddleware,
    routerMiddleware(browserHistory),
    loggerMiddleware // neat middleware that logs actions
  ),
    initialState,
    window.devToolsExtension ? window.devToolsExtension() : f => f);

  sagaMiddleware.run(sagas);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
