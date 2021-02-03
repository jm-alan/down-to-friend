import csrfetch from './csrf.js';

const setSession = (user = null) => ({ user });

export const login = ({ credential, password }) => async dispatch => {
  const res = await csrfetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({ credential, password })
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
  const response = await csrfetch('/api/session', {
    method: 'DELETE'
  });
  dispatch(setSession());
  return response;
};

const reducer = (state, { user }) => ({ ...state, user });
export default reducer;
