import React from 'react';
import ReactDOM from 'react-dom';

//import createRoutes from './createRoutes';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import createHistory from 'history/createBrowserHistory';
import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';
//import 'material-components-web/dist/material-components-web.css';

import metrics from './reducers/metrics';
import data from './reducers/data';

import HomeContainer from './containers/HomeContainer';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const store = createStore(
  combineReducers({
    metrics, 
    data
  }),
  applyMiddleware(promise, thunk,middleware)
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
        <HomeContainer/>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)