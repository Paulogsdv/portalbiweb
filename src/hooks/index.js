import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware } from 'redux';
import { promiseMiddleware } from '@adobe/redux-saga-promise';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';
import api from '../services/api';
import auth from '../services/auth';

import persistReducers from './persistReducers';
import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMidleware = createSagaMiddleware();
const middlewares = applyMiddleware(thunk, sagaMidleware, promiseMiddleware);

const store = createStore(persistReducers(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMidleware.run(rootSaga);

api.registerInterceptWithStore(store);
auth.registerInterceptWithStore(store);

export { store, persistor };
