import { configureStore } from '@reduxjs/toolkit';
import createReducer from './rootReducer';

const rootReducer = require('./rootReducer');

const reduxLogger = require(`redux-logger`);

const store = configureStore({
  reducer: createReducer(),
  middleware: (getDefaultMiddleware) => {
    if (process.env.NODE_ENV === 'development') {
      const { logger } = reduxLogger;

      return getDefaultMiddleware({
        serializableCheck: false,
        thunk: true,
        immutableCheck: true
      }).concat(logger);
    }
    return getDefaultMiddleware({
      serializableCheck: false,
      thunk: true,
      immutableCheck: true
    });
  },
  devTools: process.env.NODE_ENV === 'development'
});

store.asyncReducers = {};

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./rootReducer', () => {
    const newRootReducer = rootReducer.default;
    store.replaceReducer(newRootReducer.createReducer());
  });
}

export const injectReducer = (key, reducer) => {
  if (store.asyncReducers[key]) {
    return false;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));
  return store;
};

export default store;
