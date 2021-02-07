import EventSummary from '../EventSummary';

export default function ProfileReel ({ type, name, list, loaded }) {
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
                {`Looks like ${name} hasn't ${type} any events.`}
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
