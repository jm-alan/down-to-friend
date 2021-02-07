import csrfetch from './csrf';

const HOSTED = 'profile/HOSTED';

const ATTENDED = 'profile/ATTENDED';

const enumerate = (type, list) => ({ type, list });

export const EnumerateHosted = whereAmI => async dispatch => {
  const { data } = await csrfetch(`/api/users/${whereAmI}/events/hosted`);
  dispatch(enumerate(HOSTED, data.events));
};

export default function reducer (
  state = { hosted: [], attended: [] },
  { type, list }) {
  switch (type) {
    case HOSTED:
      return { ...state, hosted: list };
    case ATTENDED:
      return { ...state, attended: list };
    default:
      return state;
  }
}
