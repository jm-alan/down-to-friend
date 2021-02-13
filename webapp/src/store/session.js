import csrfetch from './csrf.js';

const USER = 'session/USER';

const LOAD = 'session/LOAD';

const UNLOAD = 'session/UNLOAD';

const setSession = (user = null, loaded = true) => ({ type: USER, user, loaded });

export const LoadSession = () => ({ type: LOAD });

export const UnloadSession = () => ({ type: UNLOAD });

export const LogIn = (identification, password) => async dispatch => {
  const { data: { user } } = await csrfetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ identification, password })
  });
  dispatch(setSession(user));
};

export const RestoreUser = () => async dispatch => {
  const { data: { user } } = await csrfetch('/api/session');
  dispatch(setSession(user));
};

export const SignUp = newUser => async dispatch => {
  const { firstName, email, password } = newUser;
  const { data: { user } } = await csrfetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      firstName,
      email,
      password
    })
  });
  dispatch(setSession(user, false));
};

export const LogOut = () => async dispatch => {
  await csrfetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(setSession());
};

export default function reducer (
  state = { user: null, loaded: false },
  { type, user }) {
  switch (type) {
    case USER:
      return { ...state, user, loaded: true };
    case LOAD:
      return { ...state, loaded: true };
    case UNLOAD:
      return { ...state, loaded: false };
    default:
      return state;
  }
}
