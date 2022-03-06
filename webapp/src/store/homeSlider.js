const REEL = 'slider/REEL';
const NEW = 'slider/NEW';
const SETTINGS = 'slider/SETTINGS';
const LAST = 'slider/LAST';

export const ShowReel = () => ({ type: REEL });

export const ShowNew = () => ({ type: NEW });

export const ShowSettings = () => ({ type: SETTINGS });

export const ShowLast = () => ({ type: LAST });

export default function reducer (
  // eslint-disable-next-line default-param-last
  state = { mode: 'reel', last: 'new' },
  { type }
) {
  switch (type) {
    case REEL:
      return { mode: 'reel', last: state.mode };
    case NEW:
      return { mode: 'new', last: 'reel' };
    case SETTINGS:
      return { mode: 'settings', last: 'reel' };
    case LAST:
      return { mode: state.last, last: state.mode };
    default:
      return state;
  }
}
