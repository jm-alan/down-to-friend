import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import JoinButton from './JoinButton';
import { JoinEvent, LeaveEvent } from '../../store/user';
import { ShowModal } from '../../store/modal';

export default function SummaryBody ({ profileClick, event }) {
  const dispatch = useDispatch();
  const totalSlots = event.maxGroup;
  const { user } = useSelector(state => state.session);
  const [totalAttending, setTotalAttending] = useState(event.AttendingUsers.length);
  const [slotsRemaining, setSlotsRemaining] = useState(totalSlots - totalAttending);
  const [isAttending, setIsAttending] = useState(!!event.isAttending);
  const [errors, setErrors] = useState([]);

  const [joinButtonState, setJoinButtonState] = useState(
    slotsRemaining
      ? event.isAttending
          ? 2
          : 0
      : 3
  );

  const HeapJoin = () => {
    dispatch(JoinEvent(event.id))
      .then(() => {
        setTotalAttending(attending => attending + 1);
        setSlotsRemaining(remaining => remaining - 1);
        setJoinButtonState(1);
        setIsAttending(true);
      })
      .catch(err => {
        setErrors([err]);
      });
  };

  const onEventInteract = (e) => {
    console.log('Event interacted', isAttending, user);
    e.stopPropagation();
    e.preventDefault();
    setErrors([]);
    if (!isAttending) {
      if (!user) {
        dispatch(ShowModal(HeapJoin));
      } else {
        HeapJoin();
      }
    } else {
      dispatch(LeaveEvent(event.id))
        .then(() => {
          setTotalAttending(attending => attending - 1);
          setSlotsRemaining(remaining => remaining + 1);
          setJoinButtonState(0);
          setIsAttending(false);
        });
    }
  };

  return (
    <>
      <div className='event-summary-header-container'>
        <button
          className='event-join-button'
          onClick={onEventInteract}
        >
          <JoinButton
            disabled={joinButtonState === 3}
            state={joinButtonState}
            setState={setJoinButtonState}
          />
        </button>
        <div className='event-summary-user-container'>
          <div
            className='event-summary-username'
          >
            <Link
              to={`/users/${event.Host.id}`}
              onClick={profileClick}
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
    </>
  );
}
