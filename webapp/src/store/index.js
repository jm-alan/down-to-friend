import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import session from './session';
import reel from './reel';
import map from './map';
import search from './search';
import modal from './modal';
import user from './user';
import profile from './profile';
import messenger from './messenger';
import newChat from './newchat';
import eventModal from './eventModal';
import homeSlider from './homeSlider';
import notifManager from './notifManager';

const rootReducer = combineReducers({
  session,
  reel,
  map,
  search,
  modal,
  user,
  profile,
  messenger,
  newChat,
  eventModal,
  homeSlider,
  notifManager
});

let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

export default function configureStore (preloadedState) {
  return createStore(rootReducer, preloadedState, enhancer);
}
