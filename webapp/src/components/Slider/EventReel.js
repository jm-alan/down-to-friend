import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import EventSummary from '../EventSummary';
import { SetRef } from '../../store/reel';

export default function EventReel () {
  const dispatch = useDispatch();

  const events = useSelector(state => state.reel.list);
  const eventsArray = Object.values(events);

  const reelRef = useRef(null);

  useEffect(() => {
    dispatch(SetRef(reelRef.current));
  }, [dispatch]);

  return (
    <div
      className='event-reel-container'
      ref={reelRef}
    >
      {eventsArray.length
        ? eventsArray.map(event => (
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
