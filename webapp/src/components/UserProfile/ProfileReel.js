import EventSummary from '../EventSummary';

export default function ProfileReel ({ type, name, list, loaded }) {
  return (
    <div className='event-reel-container'>
      {loaded
        ? list.length
            ? list.map(event => (
              <EventSummary
                key={event.id}
                event={event}
                isProfile
              />
              ))
            : (
              <h1>
                {`Looks like ${
                  name === 'you'
                  ? 'you haven\'t'
                  : `${name} hasn't`
                  } ${type} any events.`}
              </h1>
              )
        : <img src={`${process.env.PUBLIC_URL}/img/dual-ring-small.svg`} alt='Loading...' />}
    </div>
  );
}
