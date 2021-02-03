import csrfetch from './csrf.js';

const USER = 'session/USER';

const setSession = (user = null) => ({ type: USER, user });

export const login = (identification, password) => async dispatch => {
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

export const signup = (user) => async dispatch => {
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

export const logout = () => async dispatch => {
  await csrfetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(setSession());
};

const reducer = (state = { user: null }, { type, user }) => type === USER ? ({ user }) : state;
export default reducer;
