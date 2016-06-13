import config from 'config';
import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import sagaMiddleware from 'redux-saga';
import {routerMiddleware} from 'react-router-redux';
import {browserHistory} from 'react-router';

const reducers = require('../reducers');
const sagas = require('../sagas');

const loggerMiddleware = createLogger({
  predicate: () => config.appEnv === 'dev'
});

const createStoreWithMiddleware = applyMiddleware(
  sagaMiddleware(...sagas),
  routerMiddleware(browserHistory),
  loggerMiddleware // neat middleware that logs actions
)(createStore);

export default function (initialState) {
  const store = createStoreWithMiddleware(reducers, initialState,
    window.devToolsExtension ? window.devToolsExtension() : f => f);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
