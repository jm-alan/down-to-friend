import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import LoginForm from '../FormModal/LoginForm';
import { JoinEvent, LeaveEvent } from '../../store/user';
import { SetCurrent, ShowModal, SetAfter } from '../../store/modal';

export default function JoinButton ({
  event, slotsRemaining, setSlotsRemaining, setTotalAttending
}) {
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);
  const loadState = useSelector(state => state.session.loadState);
  const sessionLoaded = useSelector(state => state.session.loaded);

  const [isAttending, setIsAttending] = useState(!!event.isAttending);
  const [displayState, setDisplayState] = useState(
    isAttending
      ? 2
      : slotsRemaining ? 0 : 3);

  const HeapJoin = () => {
    const after = () => {
      setTotalAttending(attending => attending + 1);
      setSlotsRemaining(remaining => remaining - 1);
      setDisplayState(1);
      setIsAttending(true);
    };
    dispatch(JoinEvent(event.id, after));
  };

  const onEventInteract = e => {
    e.stopPropagation();
    e.preventDefault();
    if (!isAttending) {
      if (!user) {
        dispatch(SetCurrent(LoginForm));
        dispatch(ShowModal());
        dispatch(SetAfter(HeapJoin));
      } else {
        HeapJoin();
      }
    } else {
      const after = () => {
        setTotalAttending(attending => attending - 1);
        setSlotsRemaining(remaining => remaining + 1);
        setDisplayState(0);
        setIsAttending(false);
      };
      dispatch(LeaveEvent(event.id, after));
    }
  };

  useEffect(() => {
    if (displayState === 1) {
      setTimeout(() => {
        setDisplayState(2);
      }, 1000);
    }
  }, [displayState, setDisplayState]);

  useEffect(() => {
    if (sessionLoaded && loadState === 'hot') {
      if (user) {
        const hotloadAttending = event.AttendingUsers.some(({ id }) => id === user.id);
        setIsAttending(hotloadAttending);
        setDisplayState(prev => hotloadAttending ? 2 : prev);
      } else {
        setIsAttending(false);
        setDisplayState(slotsRemaining ? 0 : 3);
      }
    }
  }, [slotsRemaining, sessionLoaded, loadState, user]);

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
