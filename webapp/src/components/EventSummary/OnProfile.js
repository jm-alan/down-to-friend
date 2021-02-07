import { Link } from 'react-router-dom';

export default function OnProfile ({ event }) {
  const totalAttending = event.EventAttendees.length;
  const totalSlots = event.maxGroup;
  const slotsRemaining = totalSlots - totalAttending;

  return (
    <div
      className='event-summary-container'
    >
      <div className='event-summary-header-container'>
        <div className='event-summary-user-container'>
          <div
            className='event-summary-username'
          >
            <Link
              to={`/users/${event.Host.id}`}
            >
              {event.Host.firstName}
            </Link>
          </div>
          <div className='user-profile-image-container'>
            <Link to={`/users/${event.Host.id}`}>
              <img
                src={event.Host.Avatar.url}
                alt='profile thumbnail'
              />
            </Link>
          </div>
        </div>
        <div className='event-summary-presentation-container'>
          <div className='event-summary-preamble-container'>
            <h3>
              wants to go
            </h3>
          </div>
          <div className='event-summary-title-container'>
            <h1>
              {event.title.toTitleCase()}
            </h1>
          </div>
          <div className='event-summary-attending-container'>
            <span>
              {totalAttending} joined,{' '}
              {slotsRemaining} of {totalSlots} spots still open
            </span>
          </div>
        </div>
      </div>
      <div className='event-summary-body-container'>
        <p>
          {event.description}
        </p>
      </div>
      <div className='event-summary-footer-container'>
        <div className='event-summary-timestamp-container'>
          {(new Date(event.createdAt))
            .toLocaleString({}, {
              timeStyle: 'short',
              dateStyle: 'short'
            })}
        </div>
        <div className='event-summary-tags-outer-container'>
          <div className='event-summary-tags-inner-container'>
            {event.tags.split(' ').sort((a, b) => b.length - a.length)
              .map((tag, idx) => (
                <div key={idx} className='tag-wrapper'>
                  <Link to={`/events/tagged/${tag}`}>
                    {tag}
                  </Link>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
