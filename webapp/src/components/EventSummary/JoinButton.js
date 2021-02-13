import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { JoinEvent, LeaveEvent } from '../../store/user';
import { ShowModal } from '../../store/modal';

export default function JoinButton ({
  event, slotsRemaining, setSlotsRemaining, setTotalAttending
}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);

  const [isAttending, setIsAttending] = useState(!!event.isAttending);
  const [displayState, setDisplayState] = useState(
    slotsRemaining
      ? isAttending ? 2 : 0
      : 3);

  const HeapJoin = () => {
    dispatch(JoinEvent(event.id))
      .then(() => {
        setTotalAttending(attending => attending + 1);
        setSlotsRemaining(remaining => remaining - 1);
        setDisplayState(1);
        setIsAttending(true);
      });
  };

  const onEventInteract = e => {
    e.stopPropagation();
    e.preventDefault();
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
          setDisplayState(0);
          setIsAttending(false);
        });
    }
  };

  useEffect(() => {
    if (displayState === 1) {
      setTimeout(() => {
        setDisplayState(2);
      }, 1000);
    }
  }, [displayState, setDisplayState]);

  return (
    <button
      className='event-join-button'
      onClick={onEventInteract}
      disabled={displayState === 3}
    >
      {(() => {
        switch (displayState) {
          case 0:
            return (
              <>
                <i className='fas fa-plus' />
                <span className='join-text'>
                  Join
                </span>
              </>
            );
          case 1:
            return (
              <>
                <i className='fas fa-check' />
                <span className='join-text'>
                  Joined!
                </span>
              </>
            );
          case 2:
            return (
              <>
                <i className='fas fa-times' />
                <span className='join-text'>
                  Leave
                </span>
              </>
            );
          case 3:
            return (
              <>
                <i className='fas fa-circle' />
                <span className='join-text'>
                  Full
                </span>
              </>
            );
          default:
            return null;
        }
      })()}
    </button>
  );
}
