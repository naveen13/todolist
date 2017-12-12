import { applyMiddleware, createStore } from 'redux';
// import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import Reducers from '../reducers'

// const middleware = applyMiddleware(promise(), thunk, createLogger());

const middleware = applyMiddleware(promise(), thunk);

const Store = createStore(Reducers, middleware);

export default Store;
