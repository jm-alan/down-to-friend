const FORM = 'modal/FORM';

const DISPLAY = 'modal/DISPLAY';

export const ModalForm = form => ({ type: FORM, form });

export const ModalDisplay = display => ({ type: DISPLAY, display });

export default function reducer (
  state = { form: 'login', display: false },
  { type, form, display }) {
  switch (type) {
    case FORM:
      return { ...state, form };
    case DISPLAY:
      return { ...state, display };
    default:
      return state;
  }
}
