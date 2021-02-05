import { AutoComplete } from '../store/search';

export async function PlaceSearch (query, dispatch) {
  const resp = await window.fetch(`/api/search/autocomplete?query=${query}`);
  const { predictions } = resp.ok
    ? await resp.json()
    : {
        predictions: [
          'Something went wrong, please try again.',
          `Response: ${resp.status}, ${resp.statusText}`
        ]
      };

  dispatch(AutoComplete(predictions));
}

export async function PlaceDetails (query, dispatch, isPlace = false) {
  const resp = isPlace
    ? await window.fetch(`/api/search/details?placeId=${query}`)
    : await window.fetch(`/api/search/raw?query=${query}`);
    
}
