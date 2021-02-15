import csrfetch from './csrf';

const SHOW = 'newEvent/SHOW';

const HIDE = 'newEvent/HIDE';

export const ShowNewEvent = () => ({ type: SHOW });

export const HideNewEvent = () => ({ type: HIDE });

export const CreateEvent = event => async () => {
  const { data } = await csrfetch('/api/events', {
    method: 'POST',
    body: JSON.stringify({ event })
  });
  return data;
};

export default function reducer (
  state = { display: false },
  { type }
) {
  switch (type) {
    case SHOW:
      return { ...state, display: true };
    case HIDE:
      return { ...state, display: false };
    default:
      return state;
  }
}
