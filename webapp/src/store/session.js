import csrfetch from './csrf.js';

const USER = 'session/USER';

const setSession = (user = null) => ({ type: USER, user });

export const LogIn = (identification, password) => async dispatch => {
  const res = await csrfetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ identification, password })
  });
  dispatch(setSession(res.data.user));
  return res;
};

export const restoreUser = () => async dispatch => {
  const res = await csrfetch('/api/session');
  dispatch(setSession(res.data.user));
  return res;
};

export const SignUp = (user) => async dispatch => {
  const { username, email, password } = user;
  const response = await csrfetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      username,
      email,
      password
    })
  });
  dispatch(setSession(response.data.user));
  return response;
};

export const LogOut = () => async dispatch => {
  await csrfetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(setSession());
};

export default function reducer (state = { user: null, loaded: false }, { type, user }) {
  switch (type) {
    case USER:
      return { ...state, user, loaded: true };
    default:
      return state;
  }
}
