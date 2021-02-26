import csrfetch from './csrf';

const REEL = 'slider/REEL';

const NEW = 'slider/NEW';

const SETTINGS = 'slider/SETTINGS';

const LAST = 'slider/LAST';

export const ShowReel = () => ({ type: REEL });

export const ShowNew = () => ({ type: NEW });

export const ShowSettings = () => ({ type: SETTINGS });

export const ShowLast = () => ({ type: LAST });

export const CreateEvent = event => async () => {
  const { data } = await csrfetch('/api/events', {
    method: 'POST',
    body: JSON.stringify({ event })
  });
  return data;
};

export default function reducer (state = { mode: 'reel', last: 'new' }, { type }) {
  switch (type) {
    case REEL:
      return { mode: 'reel', last: state.mode };
    case NEW:
      return { mode: 'new', last: state.mode };
    case SETTINGS:
      return { mode: 'settings', last: state.mode };
    case LAST:
      return { mode: state.last, last: state.mode };
    default:
      return state;
  }
}
