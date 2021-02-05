import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Debouncer from '../../utils/Debouncer';
import { PlaceSearch, PlaceDetails } from '../../utils/Places';
import { AutoComplete } from '../../store/search';

import './Search.css';

const debouncedPlaceSearch = Debouncer(PlaceSearch, 500);

export default function SearchBar () {
  const dispatch = useDispatch();
  const { predictions } = useSelector(state => state.search);

  const [search, updateSearch] = useState('');

  const submit = (submit) => {
    submit.preventDefault();
  };

  return (
    <div className='searchbar-container'>
      <form
        className='searchbar-form'
        onSubmit={submit}
      >
        <input
          className='searchbar-input'
          type='text'
          maxLength={50}
          value={search}
          onChange={({ target: { value } }) => {
            updateSearch(value);
            if (value.length) debouncedPlaceSearch(value, dispatch);
            else (dispatch(AutoComplete([])));
          }}
        />
        {predictions.length
          ? (
            <ul className='search-prediction-container'>
              {predictions.map((prediction, idx) => (
                <li
                  key={idx}
                  className='search-prediction'
                >
                  <div>
                    {prediction.description}
                  </div>
                </li>
              ))}
            </ul>
            )
          : null}
      </form>
    </div>
  );
}
