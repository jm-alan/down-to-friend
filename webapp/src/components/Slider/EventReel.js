import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import EventSummary from '../EventSummary';
import { SetRef } from '../../store/reel';

export default function EventReel ({ list }) {
  const dispatch = useDispatch();

  useEffect(() => {
    const hangingContainer = document.querySelector('div.event-reel-container');
    hangingContainer && dispatch(SetRef(hangingContainer));
  }, [dispatch]);

  return (
    <div
      className='event-reel-container'
    >
      {list.length
        ? list.map(event => (
          <EventSummary
            key={event.id}
            event={event}
          />
          ))
        : (
          <h1>
            Sorry, there don't seem to be any listings in this area.
          </h1>
          )}
    </div>
  );
}
