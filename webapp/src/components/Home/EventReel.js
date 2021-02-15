import EventSummary from '../EventSummary';

export default function EventReel ({ list }) {
  return (
    <div className='event-reel-container'>
      {list.length
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
          )}
    </div>
  );
}
