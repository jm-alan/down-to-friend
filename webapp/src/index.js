import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { Provider, useDispatch } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import configureStore from './store';
import csrfetch, { restoreCSRF } from './store/csrf';
import { SetMooring } from './store/modal';

import './index.css';

// eslint-disable-next-line no-extend-native
String.prototype.toTitleCase = function () {
  if (!this.match(/ /g)) return [this[0].toUpperCase(), this.slice(1)].join('');
  return this
    .split(' ')
    .map($ => [$[0].toUpperCase(), $.slice(1)].join(''))
    .join(' ');
};

Object.deepEq = ($, _) => {
  if (
    !$ || !_ ||
    typeof $ !== 'object' ||
    typeof _ !== 'object'
  ) return false;
  const [$$, __] = [$, _].map(Object.values);
  if ($$.length !== __.length) return false;
  for (const $_ in $$) {
    if (
      typeof $$[+$_] !== typeof __[+$_] || (
        typeof $$[+$_] === 'function' &&
        $$[+$_].toString() !== __[+$_].toString()
      ) || (
        typeof $$[+$_] !== 'object' &&
        typeof $$[+$_] !== 'function' &&
        $$[+$_] !== __[+$_]
      ) || (
        typeof $$[+$_] === 'object' &&
        $$[+$_] !== null &&
        !Object.deepEq($$[+$_], __[+$_])
      ) || (
        $$[+$_] === null &&
        $$[+$_] !== __[+$_]
      )
    ) return false;
  }
  return true;
};

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();
  window.csrfetch = csrfetch;
  window.store = store;
  window.dispatch = store.dispatch;
}

function Root () {
  const dispatch = useDispatch();

  const mooringRef = useRef(null);

  useEffect(() => {
    dispatch(SetMooring(mooringRef.current));
  });

  return (
    <BrowserRouter>
      <App />
      <div
        ref={mooringRef}
        id='modal'
      />
    </BrowserRouter>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
