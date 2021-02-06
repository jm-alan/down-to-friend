import { useDispatch } from 'react-redux';

import Debouncer from '../../utils/Debouncer';
import { AutoComplete, Search } from '../../store/search';
import { PlaceDetails } from '../../utils/Places';

const debouncedPlaceDetails = Debouncer(PlaceDetails, 750);

export default function Predictions ({ predictions, updateSearch }) {
  const dispatch = useDispatch();

  const autocompleteClick = (e, prediction) => {
    dispatch(AutoComplete([]));
    dispatch(Search());
    updateSearch(e.target.innerText);
    debouncedPlaceDetails(prediction.place_id, dispatch, true);
  };

  return predictions.length
    ? (
      <ul className='search-prediction-container'>
        {predictions.map((prediction, idx) => (
          <li
            key={idx}
            className='search-prediction'
          >
            <div
              onClick={(e) => autocompleteClick(e, prediction)}
            >
              {prediction.description}
            </div>
          </li>
        ))}
      </ul>
      )
    : null;
}
