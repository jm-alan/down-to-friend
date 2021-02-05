const AUTO = 'search/AUTOCOMPLETE';

const SEARCH = 'search/SEARCH';

export const AutoComplete = predictions => ({ type: AUTO, predictions });

export const Search = query => ({ type: SEARCH, query });

export default function reducer (state = { predictions: [], query: null, searched: false }, { type, predictions, query }) {
  switch (type) {
    case AUTO:
      return { ...state, predictions, searched: false };
    case SEARCH:
      return { ...state, query, searched: true };
    default:
      return state;
  }
}
