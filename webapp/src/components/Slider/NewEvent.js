import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HardSetList } from '../../store/reel';
import { UnfixMap, Focus } from '../../store/map';
import { CreateEvent, ShowLast } from '../../store/homeSlider';

export default function NewEventModal () {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const { lng: longitude, lat: latitude } = useSelector(state => state.map);

  const dateObj = new Date();
  const year = dateObj.getFullYear();
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const day = String(dateObj.getDate()).padStart(2, '0');

  const [title, updateTitle] = useState('');
  const [description, updateDescription] = useState('');
  const [date, updateDate] = useState(`${year}-${month}-${day}`);
  const [closes, updatedCloses] = useState(`${year}-${month}-${day}`);
  const [minGroup, updateMinGroup] = useState(4);
  const [maxGroup, updateMaxGroup] = useState(4);
  const [errors, setErrors] = useState([]);

  const buttonRef = useRef(null);

  const promptFinder = e => {
    e.preventDefault();
    if (!title) return buttonRef.current.click();
    const event = {
      title,
      id: '',
      Host: user,
      AttendingUsers: []
    };

    dispatch(HardSetList([event]));

    const searchBar = document.querySelector('input.searchbar-input');
    const searchContainer = document.querySelector('div.searchbar-container');
    searchBar.style.backgroundColor = 'darkgrey';
    searchContainer.style.boxShadow = '0px 0px 30px white';
    let cycles = 0;
    const attentionInterval = setInterval(() => {
      (cycles === 2 && clearInterval(attentionInterval)) ?? searchBar.focus();
      if (cycles % 2) {
        searchBar.style.backgroundColor = 'darkgrey';
        searchContainer.style.boxShadow = '0px 0px 20px white';
      } else {
        searchBar.style.backgroundColor = 'white';
        searchContainer.style.boxShadow = 'none';
      }
      cycles++;
    }, 200);
  };

  const onSubmit = e => {
    e.preventDefault();
    setErrors([]);
    const event = {
      title,
      description,
      dateTime: date,
      closes,
      minGroup,
      maxGroup,
      longitude,
      latitude
    };
    dispatch(CreateEvent(event))
      .then(resp => {
        if (resp.success) {
          dispatch(UnfixMap());
          dispatch(ShowLast());
          dispatch(Focus(longitude, latitude, null, 12));
        } else {
          setErrors([resp.reason]);
        }
      });
  };

  return (
    <div className='slider-form-container newevent'>
      {errors.length
        ? (
          <ul className='errors'>
            {errors.map(err => <li key={err.toString()} className='error'>{err}</li>)}
          </ul>
          )
        : null}
      <form
        className='slider-form new-event'
        onSubmit={onSubmit}
      >
        <div className='new-event-location-select'>
          <button
            className='new-event-location-select'
            type='button'
            onClick={promptFinder}
          >
            Find Your Event Location on the Map
          </button>
        </div>
        <input
          className='new-event title'
          placeholder='What are we doing?'
          type='text'
          value={title}
          onChange={({ target: { value } }) => updateTitle(value)}
          required
        />
        <input
          className='new-event description'
          placeholder='Details, details, details!'
          type='text'
          value={description}
          onChange={({ target: { value } }) => updateDescription(value)}
          required
        />
        <div className='input-subcontainer-holder'>
          <div className='input-subcontainer event-date'>
            <h3>When:</h3>
            <input
              className='new-event date'
              type='date'
              value={date}
              onChange={({ target: { value } }) => {
                updateDate(value);
              }}
              required
            />
          </div>
          <div className='input-subcontainer event-closes'>
            <h3>Can join no later than:</h3>
            <input
              className='new-event closes'
              type='date'
              value={closes}
              onChange={({ target: { value } }) => updatedCloses(value)}
              required
            />
          </div>
        </div>
        <div className='input-subcontainer-holder'>
          <div className='input-subcontainer event-mingroup'>
            <h3>Minimum group:</h3>
            <input
              className='new-event minGroup'
              type='number'
              value={minGroup}
              min={4}
              onChange={({ target: { value } }) => {
                updateMinGroup(value);
                updateMaxGroup(Math.max(value, maxGroup));
              }}
              required
            />
          </div>
          <div className='input-subcontainer event-maxgroup'>
            <h3>Maximum group:</h3>
            <input
              className='new-event maxGroup'
              type='number'
              value={maxGroup}
              min={4}
              onChange={({ target: { value } }) => {
                updateMaxGroup(value);
                updateMinGroup(Math.min(value, minGroup));
              }}
              required
            />
          </div>
        </div>
        <div className='new-event-submit-container'>
          <button
            className='new-event-submit'
            ref={buttonRef}
          >
            Get Down!
          </button>
        </div>
      </form>
    </div>
  );
}
