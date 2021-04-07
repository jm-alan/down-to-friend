const AUTO = 'search/AUTOCOMPLETE';

const SEARCH = 'search/SEARCH';

export const AutoComplete = predictions => ({ type: AUTO, predictions });

export const Searching = isSearching => ({ type: SEARCH, isSearching });

export default function reducer (
  // eslint-disable-next-line default-param-last
  state = {
    predictions: [],
    query: null,
    searched: false
  },
  { type, predictions, isSearching }
) {
  switch (type) {
    case AUTO:
      return { ...state, predictions, searched: false };
    case SEARCH:
      return { ...state, isSearching };
    default:
      return state;
  }
}
