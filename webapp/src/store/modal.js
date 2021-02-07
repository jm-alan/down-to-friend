const FORM = 'modal/FORM';

const DISPLAY = 'modal/DISPLAY';

const PHASE = 'modal/PHASE';

export const ModalForm = form => ({ type: FORM, form });

export const ModalDisplay = display => ({ type: DISPLAY, display });

export const SignupPhase = phase => ({ type: PHASE, phase });

export default function reducer (
  state = { form: 'login', display: false, phase: 1 },
  { type, form, display, phase }) {
  switch (type) {
    case FORM:
      return { ...state, form };
    case DISPLAY:
      return { ...state, display };
    case PHASE:
      return { ...state, phase };
    default:
      return state;
  }
}
