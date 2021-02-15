import { useDispatch } from 'react-redux';

import Debouncer from '../../utils/Debouncer';
import { AutoComplete, Searching } from '../../store/search';
import { PlaceDetails } from '../../utils/Places';

const debouncedPlaceDetails = Debouncer(PlaceDetails, 500);

export default function Predictions ({ predictions, updateSearch }) {
  const dispatch = useDispatch();

  const autocompleteClick = (e, prediction) => {
    dispatch(AutoComplete([]));
    dispatch(Searching(true));
    updateSearch(e.target.innerText);
    debouncedPlaceDetails(prediction.place_id, dispatch, true);
    dispatch(Searching(false));
  };

  return predictions.length
    ? (
      <ul
        className='search-prediction-container'
      >
        {predictions.map((prediction, idx) => (
          <li
            key={idx}
            className='search-prediction'
          >
            <div
              onClick={e => autocompleteClick(e, prediction)}
            >
              {prediction.description}
            </div>
          </li>
        ))}
      </ul>
      )
    : null;
}
