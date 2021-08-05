import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import thunk from 'redux-thunk';
import authReducer from './store/reducers/auth';
import createSagaMiddleware from 'redux-saga';
//import {logoutSaga} from './store/sagas/auth';
import {watchAuth,watchBurgerBuilder, watchOrder} from './store/sagas/index';

const rootReducer = combineReducers({
  burgerBuilder : burgerBuilderReducer,
  order : orderReducer,
  auth : authReducer
});

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = /*refer config/env.js line 74*/process.env.NODE_ENV == 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;//redux devtools will now only be available in dev. env.
//const store = createStore(burgerBuilderReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());//we can simply apply redux developer tools this way if no other enhancer like middlewares are present
const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk,sagaMiddleware)));
//sagaMiddleware.run(logoutSaga);
sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrder);
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
