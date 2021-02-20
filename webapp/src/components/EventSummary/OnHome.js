import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SetEnumerable, UnloadReel } from '../../store/reel';
import { Focus, UnloadMap } from '../../store/map';
import SummaryBody from './SummaryBody';

export default function OnHome ({ event }) {
  const dispatch = useDispatch();
  const reelRef = useSelector(state => state.reel.ref);
  const summaryHolder = useRef(null);

  const clickHandle = () => {
    const top = summaryHolder.current.offsetTop;
    reelRef.scrollTo({ top, behavior: 'smooth' });
    document.querySelectorAll('.map-pin')
      .forEach(pin => pin.classList.remove('focus'));
    document.getElementById(`map-pin-event-${event.id}`)
      .classList.add('focus');
    dispatch(SetEnumerable(false));
    dispatch(Focus(event.longitude, event.latitude, null, 12));
  };

  const profileClick = () => {
    dispatch(UnloadMap());
    dispatch(UnloadReel());
  };

  return (
    <div
      id={`event-summary-${event.id}`}
      className='event-summary-container'
      onClick={clickHandle}
      ref={summaryHolder}
    >
      <SummaryBody
        event={event}
        profileClick={profileClick}
      />
    </div>
  );
}
