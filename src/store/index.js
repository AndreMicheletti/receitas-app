import { createStore, compose, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';

import reducers from '../reducers';

const persistedReducers = persistReducer({
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['saved'],
  timeout: 5000,
}, reducers);

const store = createStore(
  persistedReducers,
  {},
  compose(
    applyMiddleware(thunk),
  ),
);

const persistor = persistStore(store);

export default {
  store, persistor,
};
