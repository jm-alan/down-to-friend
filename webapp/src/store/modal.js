const FORM = 'modal/FORM';

const SHOW = 'modal/SHOW';

const HIDE = 'modal/HIDE';

const PHASE = 'modal/PHASE';

export const ModalForm = form => ({ type: FORM, form });

export const ShowModal = (after = null) => ({ type: SHOW, after });

export const HideModal = () => ({ type: HIDE });

export const SignupPhase = phase => ({ type: PHASE, phase });

export default function reducer (
  state = {
    form: 'login',
    display: false,
    phase: 1,
    after: null
  },
  { type, form, after, phase }) {
  switch (type) {
    case FORM:
      return { ...state, form };
    case SHOW:
      return { ...state, display: true, after };
    case HIDE:
      return { ...state, display: false, after: null };
    case PHASE:
      return { ...state, phase };
    default:
      return state;
  }
}
