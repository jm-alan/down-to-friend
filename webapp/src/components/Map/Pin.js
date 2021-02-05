import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavHashLink } from 'react-router-hash-link';

import DeepEqual from '../../utils/DeepEqual';
import { Focus } from '../../store/map';
import { SetEnumerable } from '../../store/reel';

export default function Pin ({ event }) {
  const dispatch = useDispatch();
  const [mouseXY, setMouseXY] = useState({ x: 0, y: 0 });

  const pinClick = () => {
    dispatch(SetEnumerable(false));
    document.querySelectorAll('.map-pin')
      .forEach(pin => pin.classList.remove('focus'));
    document.getElementById(`map-pin-event-${event.id}`).classList.add('focus');
    dispatch(Focus(event.longitude, event.latitude, 12));
  };

  return (
    <NavHashLink
      to={`#event-summary-${event.id}`}
      smooth
    >
      <div
        className='map-pin'
        id={`map-pin-event-${event.id}`}
        onMouseDown={e => {
          setMouseXY({ x: e.clientX, y: e.clientY });
        }}
        onMouseUp={e => {
          if (DeepEqual({ x: e.clientX, y: e.clientY }, mouseXY)) pinClick();
        }}
      >
        <div>
          {event.title} with {event.User.username}
        </div>
      </div>
    </NavHashLink>
  );
}
