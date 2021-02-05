const AUTO = 'search/AUTOCOMPLETE';

export const AutoComplete = predictions => ({ type: AUTO, predictions });

export default function reducer (state = { predictions: [] }, { type, predictions }) {
  switch (type) {
    case AUTO:
      return { ...state, predictions };
    default:
      return state;
  }
}
