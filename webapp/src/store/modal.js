const MOORING = 'modal/MOORING';

const CURRENT = 'modal/CURRENT';

const SHOW = 'modal/SHOW';

const HIDE = 'modal/HIDE';

const PHASE = 'modal/PHASE';

const AFTER = 'modal/AFTER';

const DOWN = 'modal/DOWN';

export const SetMooring = mooring => ({
  type: MOORING,
  mooring
});

export const SetCurrent = Current => ({
  type: CURRENT,
  Current
});

export const ShowModal = () => ({
  type: SHOW
});

export const HideModal = () => ({
  type: HIDE
});

export const SetPhase = phase => ({
  type: PHASE,
  phase
});

export const SetAfter = after => ({
  type: AFTER,
  after
});

export const TearDown = () => ({
  type: DOWN
});

export default function reducer (
  // eslint-disable-next-line default-param-last
  state = { Current: null, mooring: null, display: false, phase: 1 },
  { type, mooring, Current, after, phase }
) {
  switch (type) {
    case MOORING:
      return { ...state, mooring };
    case CURRENT:
      return { ...state, Current };
    case SHOW:
      return { ...state, display: true };
    case HIDE:
      return { ...state, display: false };
    case PHASE:
      return { ...state, phase };
    case AFTER:
      return { ...state, after };
    case DOWN:
      return { ...state, Current: null, after: null, display: false, phase: 1 };
    default:
      return state;
  }
}
