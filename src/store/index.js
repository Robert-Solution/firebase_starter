import createSagaMiddleware from 'redux-saga';
import { configureStore } from '@reduxjs/toolkit';

import reducer from './reducer';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducer,
  middleware: [sagaMiddleware],
  devTools: process.env.NODE_ENV !== 'production',
});

sagaMiddleware.run(sagas);

export default store;
