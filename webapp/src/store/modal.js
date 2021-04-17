const SETMOORING = 'modal/MOORING';

const SETCURRENT = 'modal/CURRENT';

export const SetMooring = mooring => ({ type: SETMOORING, mooring });

export const SetCurrent = current => ({ type: SETCURRENT, current });

export const TearDown = () => ({ type: SETCURRENT, current: null });

export default function reducer (
  // eslint-disable-next-line default-param-last
  state = { current: null, mooring: null },
  { type, mooring, current }
) {
  switch (type) {
    case SETMOORING:
      return { ...state, mooring };
    case SETCURRENT:
      return { ...state, current };
    default:
      return state;
  }
}
