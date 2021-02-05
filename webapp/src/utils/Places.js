import { AutoComplete } from '../store/search';

export default async function Places (query, dispatch) {
  const resp = await window.fetch(`/api/search?query=${query}`);
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
