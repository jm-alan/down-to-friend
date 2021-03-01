import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Focus } from '../../store/map';
import { SetEnumerable } from '../../store/reel';

export default function Pin ({ event }) {
  const dispatch = useDispatch();
  const reelRef = useSelector(state => state.reel.ref);
  const [mouseXY, setMouseXY] = useState({ x: 0, y: 0 });

  const pinClick = () => {
    const top = document.getElementById(`event-summary-${event.id}`).offsetTop;
    reelRef.scrollTo({ top, behavior: 'smooth' });
    dispatch(SetEnumerable(false));
    document.querySelectorAll('.map-pin')
      .forEach(pin => pin.classList.remove('focus'));
    document.getElementById(`map-pin-event-${event.id}`).classList.add('focus');
    dispatch(Focus(event.longitude, event.latitude, null, 12));
  };

  return (
    <div className='map-pin-container'>
      <div className='map-pin-precise' />
      <div
        className='map-pin'
        id={`map-pin-event-${event.id}`}
        onMouseDown={e => {
          setMouseXY({ x: e.clientX, y: e.clientY });
        }}
        onMouseUp={e => {
          mouseXY.deepEq({ x: e.clientX, y: e.clientY }) && pinClick();
        }}
      >
        <div>
          {event.title.toTitleCase()} with {event.Host.firstName}
        </div>
      </div>
    </div>
  );
}
