import csrfetch from './csrfetch.js';

const USER = 'session/USER';
const LOAD = 'session/LOAD';
const UNLOAD = 'session/UNLOAD';

// eslint-disable-next-line default-param-last
export const SetSession = (user = null, loaded, loadState) => ({ type: USER, user, loaded, loadState });

export const LoadSession = () => ({ type: LOAD });

export const UnloadSession = () => ({ type: UNLOAD });

export const RestoreUser = () => async dispatch => {
  const { user } = await csrfetch.get('/api/session');
  dispatch(SetSession(user, true, 'cold'));
  await csrfetch.restoreCSRF();
};

export const LogIn = (identification, password) => async dispatch => {
  const { user } = await csrfetch.post('/api/session', { identification, password });
  dispatch(SetSession(user, true, 'hot'));
};

export const SignUp = newUser => async dispatch => {
  const { user } = await csrfetch.post('/api/users', newUser);
  dispatch(SetSession(user, false, 'hot'));
};

export const LogOut = () => async dispatch => {
  await csrfetch.delete('/api/session');
  dispatch(SetSession(null, true, 'hot'));
};

export default function reducer (
  // eslint-disable-next-line default-param-last
  state = { user: null, loaded: false },
  { type, user, loaded, loadState }) {
  switch (type) {
    case USER:
      return { ...state, user, loaded, loadState };
    case LOAD:
      return { ...state, loaded: true, loadState: 'hot' };
    case UNLOAD:
      return { ...state, loaded: false, loadState: 'hot' };
    default:
      return state;
  }
}
