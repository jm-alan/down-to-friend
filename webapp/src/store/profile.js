import csrfetch from './csrf';

const HOSTED = 'profile/HOSTED';

const ATTENDED = 'profile/ATTENDED';

const LOAD = 'profile/LOAD';

const UNLOAD = 'profile/UNLOAD';

const enumerate = (type, list) => ({ type, list });

const loadProfile = user => ({ type: LOAD, user });

export const UnloadProfile = () => ({ type: UNLOAD });

export const LoadProfile = whereAmI => async dispatch => {
  const { data } = await csrfetch(`/api/users/${whereAmI}`);
  dispatch(loadProfile(data.user));
};

export const EnumerateHosted = whereAmI => async dispatch => {
  const { data } = await csrfetch(`/api/users/${whereAmI}/events/hosting`);
  dispatch(enumerate(HOSTED, data.events));
};

export const EnumerateAttending = whereAmI => async dispatch => {
  const { data } = await csrfetch(`/api/users/${whereAmI}/events/attending`);
  dispatch(enumerate(ATTENDED, data.events));
};

export default function reducer (
  // eslint-disable-next-line default-param-last
  state = {
    hosted: [],
    attended: [],
    user: null,
    loadedHosted: false,
    loadedAttending: false,
    loadedProfile: false
  },
  { type, list, user }) {
  switch (type) {
    case HOSTED:
      return { ...state, hosted: list, loadedHosted: true };
    case ATTENDED:
      return { ...state, attended: list, loadedAttending: true };
    case LOAD:
      return { ...state, user, loadedProfile: true };
    case UNLOAD:
      return { ...state, loadedProfile: false, loadedHosted: false, loadedAttending: false };
    default:
      return state;
  }
}
