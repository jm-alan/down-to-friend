import { useSelector } from 'react-redux';

import EventSummary from '../EventSummary';

export default function EventReel ({ list }) {
  const loaded = useSelector(state => state.reel.loaded);
  return (
    <div className='event-reel-container'>
      {loaded
        ? list.length
            ? list.map((event, idx) => (
              <EventSummary
                key={idx}
                event={event}
              />
              ))
            : (
              <h1>
                Sorry, there don't seem to be any listings in this area.
              </h1>
              )
        : (
          <h1>
            Loading...
          </h1>
          )}
    </div>
  );
}
