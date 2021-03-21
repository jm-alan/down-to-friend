const SHOW = 'profile/SHOW';

const HIDE = 'profile/HIDE';

export const ShowProfileEditor = () => ({ type: SHOW });

export const HideProfileEditor = () => ({ type: HIDE });

export default function reducer (
  state = { display: false }, { type }
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
