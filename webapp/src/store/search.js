const AUTO = 'search/AUTOCOMPLETE';

const SEARCH = 'search/SEARCH';

export const AutoComplete = predictions => ({ type: AUTO, predictions });

export const Search = () => ({ type: SEARCH });

export default function reducer (state = { predictions: [], query: null, searched: false }, { type, predictions }) {
  switch (type) {
    case AUTO:
      return { ...state, predictions, searched: false };
    case SEARCH:
      return { ...state, searched: true };
    default:
      return state;
  }
}
