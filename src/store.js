
import {
   createStore,
   applyMiddleware,
   compose
}
from 'redux'

import thunk from 'redux-thunk'
import rootReducer from './reducer/rootReducer'

const init = {};

const midleware = [thunk];

const composeEnhancer = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancer(applyMiddleware(...midleware));

const store = createStore(rootReducer, init, enhancer);

export default store
