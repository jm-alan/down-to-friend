import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { NavHashLink } from 'react-router-hash-link';

import { Focus } from '../../store/map';
import { SetEnumerable } from '../../store/reel';

import './summary.css';

export default function EventSummary ({ event }) {
  const dispatch = useDispatch();
  const totalAttending = event.EventAttendees.length;
  const totalSlots = event.maxGroup;
  const slotsRemaining = totalSlots - totalAttending;

  const clickHandle = () => {
    document.querySelectorAll('.map-pin')
      .forEach(pin => pin.classList.remove('focus'));
    document.getElementById(`map-pin-event-${event.id}`)
      .classList.add('focus');
    dispatch(SetEnumerable(false));
    dispatch(Focus(event.longitude, event.latitude, null, 12));
  };

  return (
    <NavHashLink
      to={`#event-summary-${event.id}`}
      smooth
    >
      <div
        id={`event-summary-${event.id}`}
        className='event-summary-container'
        onClick={clickHandle}
      >
        <div className='event-summary-header-container'>
          <div className='event-summary-user-container'>
            <div
              className='event-summary-username'
            >
              <Link
                to={`/users/${event.User.id}`}
              >
                {event.User.firstName}
              </Link>
            </div>
            <div className='user-profile-image-container'>
              <Link to={`/users/${event.User.id}`}>
                <img
                  src={event.User.Avatar.url}
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
    </NavHashLink>
  );
}
