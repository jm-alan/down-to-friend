import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import JoinButton from './JoinButton';
import { ShowEventModal, SetEvent } from '../../store/eventModal';

export default function SummaryBody ({ profileClick, event }) {
  const dispatch = useDispatch();
  const totalSlots = event.maxGroup;
  const [totalAttending, setTotalAttending] = useState(event.AttendingUsers.length);
  const [slotsRemaining, setSlotsRemaining] = useState(totalSlots - totalAttending);

  const onPopEventModal = e => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(SetEvent(event));
    dispatch(ShowEventModal());
  };

  return (
    <>
      <div className='event-summary-header-container'>
        <div className='event-header-subcontainer left'>

          <Link
            to={`/users/${event.Host.id}`}
            onClick={profileClick}
          >
            <div className='event-summary-user-container'>
              <div
                className='event-summary-username'
              >
                {event.Host.firstName}
              </div>
              <div className='user-profile-image-container avatar-container'>
                {event.Host.Avatar
                  ? (
                    <img
                      src={event.Host.Avatar.url}
                      alt=''
                    />
                    )
                  : <i className='fas fa-user' />}
              </div>
            </div>
          </Link>
        </div>
        <div
          className='event-header-subcontainer center event-summary-presentation-container'
        >
          <div className='event-summary-title-container'>
            <h3>
              wants to go
            </h3>
            <h1>
              {event.title.toTitleCase()}
            </h1>
          </div>
        </div>
        <div className='event-header-subcontainer right'>
          <JoinButton
            event={event}
            slotsRemaining={slotsRemaining}
            setSlotsRemaining={setSlotsRemaining}
            setTotalAttending={setTotalAttending}
          />
          <button
            className='event-detail-display'
            onClick={onPopEventModal}
          >
            Details
          </button>
        </div>
      </div>
      <div className='event-summary-footer-container'>
        <div className='event-summary-timestamp-container'>
          {(new Date(event.createdAt))
            .toLocaleString({}, {
              timeStyle: 'short',
              dateStyle: 'short'
            })}
        </div>
        <div className='event-summary-attending-container'>
          <span>
            {totalAttending} joined,{' '}
            {slotsRemaining} of {totalSlots} spots still open
          </span>
        </div>
      </div>
    </>
  );
}
