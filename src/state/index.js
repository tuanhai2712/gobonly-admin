import { rootSaga } from './sagas';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import { rootReducer } from './reducer';
const sagaMiddleware = createSagaMiddleware();
const bindMiddleware = (middleware) => {
  middleware.push(
    createLogger({
      collapsed: true,
    })
  );
  return composeWithDevTools(applyMiddleware(...middleware));
};

export const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]));
sagaMiddleware.run(rootSaga);
